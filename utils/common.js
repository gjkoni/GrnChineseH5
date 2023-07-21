export function changeNumToHan(num) {
	var arr1 = new Array(
		"零",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九"
	);
	var arr2 = new Array(
		"",
		"十",
		"百",
		"千",
		"万",
		"十",
		"百",
		"千",
		"亿",
		"十",
		"百",
		"千",
		"万",
		"十",
		"百",
		"千",
		"亿"
	); //可继续追加更高位转换值
	if (!num || isNaN(num)) {
		return "零";
	}
	var english = num.toString().split("");
	var result = "";
	for (var i = 0; i < english.length; i++) {
		var des_i = english.length - 1 - i; //倒序排列设值
		result = arr2[i] + result;
		var arr1_index = english[des_i];
		result = arr1[arr1_index] + result;
	}
	//将【零千、零百】换成【零】 【十零】换成【十】
	result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
	//合并中间多个零为一个零
	result = result.replace(/零+/g, "零");
	//将【零亿】换成【亿】【零万】换成【万】
	result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
	//将【亿万】换成【亿】
	result = result.replace(/亿万/g, "亿");
	//移除末尾的零
	result = result.replace(/零+$/, "");
	//将【零一十】换成【零十】
	//result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
	//将【一十】换成【十】
	result = result.replace(/^一十/g, "十");
	return result;
}

export function secondFormat(second) {
	var hourTime = 0;
	var minuteTime = 0;
	var secondTime = 0;
	if (second > 60) {
		//如果秒数大于60
		minuteTime = Math.floor(second / 60);
		secondTime = Math.floor(second % 60);
		if (minuteTime >= 60) {
			//如果分钟大于60
			hourTime = Math.floor(minuteTime / 60);
			minuteTime = Math.floor(minuteTime % 60);
		} else {
			hourTime = 0;
		}
	} else {
		hourTime = 0;
		minuteTime = 0;
		if (second == 60) {
			//如果秒数等于60
			minuteTime = 1;
			secondTime = 0;
		} else {
			secondTime = Math.floor(second);
		}
	}
	var hourTimeStr = hourTime > 0 ? addZero(hourTime) + ":" : "";
	var timeResult =
		hourTimeStr + addZero(minuteTime) + ":" + addZero(secondTime);
	return timeResult;
}

function addZero(time) {
	let str = time;
	if (time < 10) {
		str = "0" + time;
	}
	return str;
}

export function isLocalStorageEnabled() {
	try {
		const key = `__storage__test`;
		window.localStorage.setItem(key, null);
		window.localStorage.removeItem(key);
		return true;
	} catch (e) {
		return false;
	}
}

export function setTabItem(t){
	// let menus = [
	// 	{index:0, text:'find.name'},
	// 	{index:1, text:'study.name'},
	// 	{index:2, text:'my.name'},
	// ]
	let menus = [
		{index:0, text:'study.name'},
		{index:1, text:'my.name'},
	]
	menus.forEach((item, index) => {
		uni.setTabBarItem({
			index: item.index,
			text: t(item.text)
		})
	})
}

export function friendlyFormatTime(stringTime) {
	let minute = 1000 * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let week = day * 7;
	let month = day * 30;
	let time1 = new Date().getTime(); //当前的时间戳
	let time2 = Date.parse(new Date(stringTime.replace(/-/g, "/"))); //指定时间的时间戳
	let time = time1 - time2;

	let result = null;
	if (time < 0) {
		result = "--";
	} else if (time / month >= 1) {
		result = parseInt(time / month) + "月前";
	} else if (time / week >= 1) {
		result = parseInt(time / week) + "周前";
	} else if (time / day >= 1) {
		result = parseInt(time / day) + "天前";
	} else if (time / hour >= 1) {
		result = parseInt(time / hour) + "小时前";
	} else if (time / minute >= 1) {
		result = parseInt(time / minute) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
};

export function richTextFormat(html) {
	html = html.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<p')
		.replace(/<p>/ig, '<p class="qxp">')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
		.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img style="max-width: 100%; display:block; margin:auto;" $1');
	return html;

}

export function algorithm() {
	let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
		'v', 'w', 'x', 'y', 'z'
	];
	let [max, min] = [Math.floor(Math.random() * (10 - 7 + 1) + 1), Math.floor(Math.random() * (17 - 10 + 1) + 17)];
	abc = abc.sort(() => 0.4 - Math.random()).slice(max, min).slice(0, 8).join("");
	var a = new Date().getTime() + abc;
	return a
}

export function callApp(actionName, params){
	try {
		window.flutter_inappwebview.callHandler(actionName, params);
	} catch (e) {}
}