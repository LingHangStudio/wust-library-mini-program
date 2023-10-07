/**
 * @description 权限存储函数
 * 登录信息：loginState,Cookie,loginInfo
 */
const authorizationKey = 'Cookie'

const getAuthorization = () => {
	return uni.getStorageSync(authorizationKey)
}

const setAuthorization = (authorization) => {
	return uni.setStorageSync(authorizationKey, authorization)
}

const removeAuthorization = () => {
	uni.removeStorageSync("fineSum")
	uni.removeStorageSync("loginState")
	uni.removeStorageSync('loginInfo')
	uni.removeStorageSync('userInfo')
	return true
}

// 退出登录:
// 删除Cookie,loginState,loginInfo,
// 删除 超期信息fineSum，用户信息
const logoutFunc = () => {
	uni.removeStorageSync("Cookie")
	removeAuthorization()
	uni.navigateBack()
}

export {
	logoutFunc, getAuthorization, setAuthorization, removeAuthorization
}