import {
	getToken,
	clear,
	getRefreshToken
} from '../utils/auth';

import {
	useUserStore
} from '@/stores/user.js'

import i18n from '@/utils/i18n.js'

function service(options = {}) {
	
	const t = i18n.global.t;
	const env = getApp().globalData.env;
	
	let isJsonFile = false;
	let requestUrl = '';
	
	if(options.conf){
		isJsonFile = options.conf.url.split('?')[0].endsWith(".json");
		requestUrl = options.conf.format ? options.conf.format(options.data) : options.conf.url;
		options.method = options.conf.method;
		delete options.conf;
	}else{
		isJsonFile = options.url.split('?')[0].endsWith(".json");
		requestUrl = `${options.url}`;
	}
	let baseurl = isJsonFile ? env.cdn_url : env.request_baseurl;
	if(isJsonFile){
		delete options.data;
	}
	options.url = `${baseurl}${requestUrl}`;
	
	// 判断本地是否存在token，如果存在则带上请求头
	let locale = uni.getStorageSync('locale') ? uni.getStorageSync('locale') : uni.getLocale();
	let header = {
		'content-type': 'application/json',
		'app-locale': locale
	};
	if (getToken() && !isJsonFile) {
		header["Authorization"] = `${getToken()}`;
	}
	options.header = header;


	const userStore = useUserStore();

	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			if (res.data.code) {
				// 如果请求回来的状态码不是200则执行以下操作
				if (res.data.code !== 200) {
					// 登陆失效
					if (res.data.code === 401) {
						// 清除本地token
						var refresh_token = getRefreshToken();
						userStore.refreshToken({
							refresh_token: refresh_token
						}).then((r) => {
							options.header["Authorization"] = `${getToken()}`;
							uni.request(options);
						});
					} else if (res.data.code === 1401) {
						clear()
						uni.showToast({
							icon: 'none',
							duration: 3000,
							title: t('app.loginExpired')
						});
						
						// 返回错误信息
						rejected(res)
					} else {
						// 非成功状态码弹窗
						uni.showToast({
							icon: 'none',
							duration: 3000,
							title: `${JSON.stringify(res)}`
						});
						
						// 返回错误信息
						rejected(res)
					}
				} else {
					// 请求回来的状态码为200则返回内容
					resolved(res.data.data)
				}
			} else {
				resolved(res.data)
			}
		};
		options.fail = (err) => {
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: JSON.stringify(err)
			});
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;