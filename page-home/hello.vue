<template>
	<view class="hello-container">
		<!-- 没有登录，暂时不用 -->
		<!-- <view class="content">
			<view class="info">
				<view class="detail" @tap="getUserProfile">
					点击授权<br />以体验助手全部功能
				</view>
			</view>
			<view class="btn icon-shanshuo">
				<button class="submit-btn shadow shadow-blur" hover-class="tapbtn" @tap="getUserProfile">点击授权</button>
			</view>
			<view class="usage">
				<view class="header">
					武科大学子授权后可以体验
				</view>
			</view>
		</view> -->
	</view>
</template>

<script setup lang="ts">
	const getUserProfile = () => {
		uni.navigateTo({
			url: "/page-center/login"
		})
		// uni.getUserProfile({
		// 	desc: "用于完善用户信息",
		// 	success: res => {
		// 		let userInfo = res.userInfo
		// 		console.log(userInfo)
		// 		// this.userInfo = userInfo
		// 		// this.notlogin = false
		// 		uni.setStorageSync('userInfo', userInfo)
		// 		// this.$emit('hideHello')
		// 	},
		// 	fail: res => {
		// 		// this.$emit('hideHello')
		// 		console.log("用户信息获取失败")
		// 	}
		// })

		// uni.getSetting({
		// 	success(res) {
		// 		console.log(res)
		// 		if (res.authSetting['scope.userInfo']) {
		// 			// 用户信息已授权，获取用户信息
		// 			uni.getUserInfo({
		// 				success(res) {
		// 					console.log(res.userInfo);
		// 					setTimeout(() => {
		// 						uni.setStorageSync("WechatToken", res.encryptedData)
		// 					}, 1000)
		// 					setTimeout(() => {
		// 						uni.setStorageSync("WechatInfo", res.userInfo)
		// 					}, 1000)
		// 					// _this.isdisplay = false
		// 					console.log('获取信息成功')
		// 				},
		// 				fail() {
		// 					console.log("获取用户信息失败")
		// 				}
		// 			})
		// 		} else if (!res.authSetting['scope.userInfo']) {
		// 			uni.navigateTo({
		// 				url: "/page-home/hello"
		// 			})
		// 			console.log("需要点击按钮手动授权")
		// 		}
		// 	},
		// 	fail() {
		// 		console.log("获取已授权选项失败")
		// 	}
		// })

	}
</script>

<style scoped lang="scss">
	.hello-container {
		background: #F7F9F8;
		width: 750rpx;
		overflow-x: hidden;
		height: 100vh;

		.content {
			box-sizing: border-box;
			padding-top: 50rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.info {
				width: 68%;
				margin: 40rpx auto 0;

				.logo {
					margin: 120rpx auto 30rpx;
					width: 160rpx;
					height: 160rpx;
					border-radius: 24rpx;
					overflow: hidden;

					.logo-img {
						width: 160rpx;
						height: 160rpx;
					}
				}

				.title {
					color: rgb(31, 200, 140);
					margin: 10rpx auto 6rpx;
					text-align: center;
					letter-spacing: .2rem;
					font-size: 48rpx;
					font-weight: bold;
				}

				.eng-title {
					color: rgb(31, 200, 140);
					margin: 6rpx auto;
					text-align: center;
					letter-spacing: .28rem;
					font-size: 26rpx;
				}

				.detail {
					margin: 0;
					letter-spacing: .24rem;
					font-size: 42rpx;
					font-weight: bold;
				}
			}

			.btn {
				animation: btn-shanshuo 1.5s infinite;
				margin: 0;

				// .submit-btn {
				// 	box-shadow: 0 0 1rpx $green,
				// 		0 0 5rpx $green,
				// 		0 0 10rpx $green,
				// 		0 0 40rpx $green, ;
				// 	border-radius: 2rpx;
				// 	width: 200rpx;
				// 	height: 200rpx;
				// 	line-height: 200rpx;
				// 	border-radius: 200rpx;
				// 	margin: 0.6rem auto;
				// 	padding: 0.2rem;
				// 	border: 1px solid $darkGreen;
				// 	font-size: 0.8rem;
				// 	color: #F8F8F8;
				// 	// height: 2.6rem;
				// 	// line-height: 2.2rem;
				// 	font-weight: bold;
				// 	background: linear-gradient(90deg, $darkGreen 0%, $dominantHue 100%);
				// 	;
				// }
			}

			.usage {
				margin: -20rpx 0 20rpx;

				.header {
					font-weight: bold;
					margin: 20rpx 0;
					font-size: 38rpx;
					text-align: center;
				}

				.usage-content {
					width: 88%;
					margin: 0 auto;
					text-align: center;
					font-size: 34rpx;

					.row1 {
						margin: 24rpx 0;
						display: flex;
						justify-content: space-around;

						.col1 {
							width: 50%;
						}

						.col2 {
							width: 50%;
						}
					}

					.row2 {
						margin: 24rpx 0;
						display: flex;
						justify-content: space-around;

						.col1 {
							width: 50%;
						}

						.col2 {
							width: 50%;
						}
					}

					.row3 {
						margin: 24rpx 0;
						display: flex;
						justify-content: space-around;
						font-size: 30rpx;
					}

					.tip {
						margin-top: 40rpx;
					}
				}
			}

			.other {
				width: 86%;
				margin: 0 auto;
				text-align: center;

				.name {
					margin: 10rpx;
					font-size: 30rpx;
				}

				.url {
					font-size: 28rpx;
				}
			}
		}
	}
</style>