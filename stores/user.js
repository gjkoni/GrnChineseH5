import {
	defineStore
} from 'pinia'

export const useUserStore = defineStore({
	id: 'user', // id必填，且需要唯一
	state: () => {
		return {
			userID: '',
			userName: '',
			userMobile:'',
			avatar: '',
			bigAvatar:'',
		}
	},
	getters: {
		isLogin: (state) => state.userID !== '',
		nickName:(state) => state.userName,
		userHead: (state) => state.avatar,
		userBigHead: (state) => state.bigAvatar
	},
	// actions 用来修改 state
	actions: {
		// login(params) {
		// 	return new Promise((resolve, reject) => {
		// 		login(params).then(response => {
		// 			setToken(response.token) //将获取到的token保存到本地
		// 			setRefreshToken(response.refresh_token) //将获取到的token保存到本地
		// 			resolve(response)
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// },
		// logout() {
		// 	this.userID = "";
		// 	this.userName = "";
		// 	this.avatar = "";
		// 	this.bigAvatar = "";
		// }
	}
})