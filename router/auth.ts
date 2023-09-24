/**
 * @description 权限存储函数
 */
const authorizationKey = 'Cookie'

export const getAuthorization=()=> {
	return uni.getStorageSync(authorizationKey)
}

export function setAuthorization(authorization) {
	return uni.setStorageSync(authorizationKey, authorization)
}

export function removeAuthorization(authorization) {
	return uni.removeStorageSync(authorizationKey)
}

// 退出登录:
// 删除Cookie,loginState,loginInfo,
// 删除 超期信息
export const logoutFunc=()=>{
	uni.removeStorageSync("Cookie")
	uni.removeStorageSync("loginState")
	uni.removeStorageSync("loginInfo")
	uni.removeStorageSync("fineSum")
	uni.navigateBack()
}