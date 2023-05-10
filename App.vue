<script setup lang="ts">
	import {
		onShow,
		onHide,
		onLaunch
	} from "@dcloudio/uni-app"
	import routingIntercept from "@/router/permission.js"
	onLaunch(() => {
		routingIntercept()
		// console.log("加载字体");
		// uni.loadFontFace({
		// 	family: 'luxun',
		// 	source: 'url("./static/luxun.otf")',
		// 	success() {
		// 		console.log("success");
		// 	}, fail() {
		// 		console.log("err");
		// 	},
		// 	complete() {
		// 		console.log("over");
		// 	}
		// })
		console.log('App Launch')
		if (uni.getStorageSync("WechatToken")) {
			console.log("微信以授权");
		} else {

		}
		uni.getSetting({
			success(res) {
				console.log(res)
				if (res.authSetting['scope.userInfo']) {
					// 用户信息已授权，获取用户信息
					uni.getUserInfo({
						success(res) {
							console.log(res.userInfo);
							setTimeout(() => {
								uni.setStorageSync("WechatToken", res.encryptedData)
							}, 1000)
							// _this.isdisplay = false
							console.log('获取信息成功')
						},
						fail() {
							console.log("获取用户信息失败")
						}
					})
				} else if (!res.authSetting['scope.userInfo']) {
					uni.navigateTo({
						url: "/page-home/hello"
					})
					console.log("需要点击按钮手动授权")
				}
			},
			fail() {
				console.log("获取已授权选项失败")
			}
		})
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function (loginRes) {
		// 		console.log(loginRes);
		// 		uni.setStorageSync("WechatToken", loginRes.code)
		// 		// 获取用户信息
		// 		uni.getUserInfo({
		// 			provider: 'weixin',
		// 			success: function (infoRes) {
		// 				uni.setStorageSync("WechatUser", infoRes.userInfo)
		// 				console.log(infoRes);
		// 			}
		// 		});
		// 	},
		// 	fail: () => {
		// 		uni.showToast({
		// 			title: "获取信息失败！"
		// 		})
		// 	}
		// });

	})
	onShow(() => {
		console.log('App Show')
	})
	onHide(() => {
		console.log('App Hide')
	})
</script>

<style>
	/*每个页面公共css */
</style>