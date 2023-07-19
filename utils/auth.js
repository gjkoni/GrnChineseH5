const TokenKey = 'User-Token'
const RefreshTokenKey = 'User-Refresh-Token'
const UserIDKey = 'MKey'
const UserNameKey = 'MNKey'

export function getUserID() {
	var val = null;
	try {
		val = uni.getStorageSync(UserIDKey);
	} catch (e) {
		console.log('storage get uid error: ' + e);
	}
	return val;
}

export function getUserName() {
	var val = null;
	try {
		val = uni.getStorageSync(UserNameKey);
	} catch (e) {
		console.log('storage get uid error: ' + e);
	}
	return val;
}

export function getToken() {
	var val = null;
	try {
		val = uni.getStorageSync(TokenKey);
	} catch (e) {
		console.log('storage get token error: ' + e);
	}
	return val;
}

export function getRefreshToken() {
	var val = null;
	try {
		val = uni.getStorageSync(RefreshTokenKey);
	} catch (e) {
		console.log('storage get refresh-token error: ' + e);
	}
	return val;
}

export function setUserID(userID) {
	try {
		uni.setStorageSync(UserIDKey, userID);
	} catch (e) {
		console.log('storage uid error: ' + e);
	}
}

export function setUserName(userName) {
	try {
		uni.setStorageSync(UserNameKey, userName);
	} catch (e) {
		console.log('storage uid error: ' + e);
	}
}

export function setToken(token) {
	try {
		uni.setStorageSync(TokenKey, token);
	} catch (e) {
		console.log('storage token error: ' + e);
	}
}

export function setRefreshToken(token) {
	try {
		uni.setStorageSync(RefreshTokenKey, token);
	} catch (e) {
		console.log('storage refresh-token error: ' + e);
	}
}

export function clear() {
	try {
		uni.removeStorageSync(TokenKey);
		uni.removeStorageSync(RefreshTokenKey);
		uni.removeStorageSync(UserIDKey);
		uni.removeStorageSync(UserNameKey);
	} catch (e) {
		console.log('storage remove uid error: ' + e);
	}
}