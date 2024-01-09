<template>
	<view class="root">
		<Logo></Logo>
		<view @tap.stop="goTo('/page-home/search', 'inner')">
			<uni-search-bar bg-color="#EBEDF0" readonly cancel-button="none" placeholder="搜索书名,作者,分类,IBSN"
				:radius="100"></uni-search-bar>
		</view>
		<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="2000">
			<swiper-item @tap="viewImg(item.url)" v-for="(item, index) in bannerList" :key="index">
				<!-- <view class="swiper-item uni-bg-red"> -->
				<image :src="item.url" alt="error"></image>
				<!-- </view> -->
			</swiper-item>
		</swiper>
		<Nav></Nav>
		<Recommend></Recommend>
		<uni-popup ref="popImg">
			<movable-area class="img-area">
				<movable-view :inertia="true" :out-of-bounds="true" direction="all" :scale="true">
					<image :src="imgUrl" alt="图片加载失败"></image>
				</movable-view>
			</movable-area>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import Nav from "@/pages/home/components/nav.vue"
	import Logo from "@/pages/home/components/logo.vue"
	import Recommend from "@/pages/home/components/recommend.vue"
	import { ref, onMounted, Ref } from "vue"
	import { removeAuthorization } from "@/router/auth"
	import { loginAPI, login1API } from "@/api/user/user"
	import { loginFinalApi } from "@/api/end"
	import { statsApi } from "@/api/huiwen/center"

	// 图片弹窗，放大浏览
	const popImg = ref(null)
	const imgUrl = ref("")

	const bannerList = ref([
		{
			url: "https://smarttool.wust.edu.cn:3001/images/background-img1.jpg",
		},
		{
			url: "https://smarttool.wust.edu.cn:3001/images/background-img2.jpg",
		},
	])

	const goTo = (url : string, type : string) => {
		if (type == "tsg") {
			uni.navigateTo({
				url: "/page-home/tsgview?url=" + url,
			})
		} else {
			uni.navigateTo({
				url: url,
			})
		}
	}

	const login = async (loginInfo : any) => {
		try {
			// 进入登录流程
			console.log(loginInfo.password)
			const res1 = await loginAPI(loginInfo)
			console.log("res", res1)
			const res2 = await login1API(res1?.data)
			console.log("res2", res2)
			// 第三个接口，请求自己的后台，获取到Cookie
			let myCookie = await loginFinalApi(res2?.data)
			console.log("Cookie", myCookie)
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
		popImg.value.open()
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