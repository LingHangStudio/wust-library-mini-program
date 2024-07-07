<template>
	<view class="root">
		<!-- 搜索框 -->
		<Search></Search>
		<!-- 借阅服务列表 -->
		<Nav></Nav>
		<!-- 公众号轮播图 -->
		<OfficialSwiper></officialSwiper>
		<!-- 好书推荐 -->
		<Recommend></Recommend>
	</view>
</template>

<script setup lang="ts">
	import Nav from "@/pages/home/components/nav.vue"
	import Search from "@/pages/home/components/search.vue"
	import Recommend from "@/pages/home/components/recommend.vue"
	import OfficialSwiper from "@/pages/home/components/officialSwiper.vue"

	import { ref, onMounted, Ref } from "vue"
	import { removeAuthorization } from "@/router/auth"
	import { loginAPI, login1API } from "@/api/user/user"
	import { loginFinalApi } from "@/api/end"
	import { statsApi } from "@/api/huiwen/center"

	// 图片弹窗，放大浏览
	const popImg = ref(null)
	const imgUrl = ref("")


	// onPullDownRefresh() {
	// 	console.log("下拉刷新了")

	// }

	const login = async (loginInfo : any) => {
		try {
			// 进入登录流程
			console.log(loginInfo.password)
			const res1 = await loginAPI(loginInfo)
			const res2 = await login1API(res1.data.tgt)
			// 第三个接口，请求自己的后台，获取到Cookie
			let myCookie = await loginFinalApi(res2?.data)
			// 登录成功后的处理
			uni.setStorageSync("loginState", true)
			uni.setStorageSync("Cookie", myCookie.data.cookie.split(";")[0])
			// uni.navigateBack()
		} catch (e) {
			// 任何异常，只捕获，不提示
			console.log(e)
			// 登录失败，把登录信息删除
			removeAuthorization()
		}
	}

	// 借阅概览
	const stats : Ref<any> = ref({
		fineSum: 0, // 我的欠款
	})

	const getStats = async () => {
		const res : any = await statsApi()
		//已经取消api拦截器拦截，需要自己处理报错
		if (res.statusCode === 401) {
			// 登录过期，需要重新登录
			login(uni.getStorageSync("loginInfo"))
		} else {
			// 没过期，获取信息后，设置超期提醒
			let fineSum = res.data.data.fineSum
			if (fineSum !== 0) {
				uni.setStorageSync("fineSum", fineSum.toString())
				uni.setTabBarBadge({
					index: 3,
					text: fineSum.toStirng(),
					fail: (result : any) => {
						console.log(result)
					},
				})
			}
		}
	}

	const viewImg = (url : string) => {
		imgUrl.value = url;
		popImg.value.open();
		navigateToArticle
	}
	const navigateToArticle = () => {
		// 调用微信小程序的跳转方法
		wx.navigateToMiniProgram({
			appId: 'wx10a1836791a682d0',
			path: 'pages/activity/index',
			extraData: {
				// 传递的额外参数，可以为空
			},
			success(res) {
				console.log(res);
			},
			fail(res) {
				console.error(res);
			}
		})
	}
	onMounted(() => {
		// 登录验证逻辑:
		// 用户没登录过：就跳过
		// 用户曾经登录过：请求看有没有401
		// 没有 跳出；有401重新登录
		uni.getStorageSync("loginState") && getStats()
	})
</script>

<style lang="scss" scoped>
	swiper {
		height: 400rpx;

		image {
			width: 100vw;
		}
	}

	.img-area {
		transform: translateX(-160px) translateY(-30vh);
	}

	@media (prefers-color-scheme: dark) {
		.root {
			color: #fff;
			background-color: #000;
		}
	}
</style>