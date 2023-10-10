<template>
	<view class="head">
		<view class="logo">
			<img class="logoImg" src="@/static/logo.png" alt="">
		</view>
		<view class="font">
			<p class="chinese">
				武汉科技大学图书馆
			</p>
			<p class="english">
				Wuhan University of Science and Technology Library
			</p>
		</view>
		<view class="background">
			<img class="background-img"
				src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" alt="">
		</view>
	</view>
	<view @tap.stop="goTo('/page-home/search','inner')" class="search">
		<uni-search-bar bgColor="#EBEDF0" readonly cancelButton="none" placeholder="搜索书名,作者,分类,IBSN"
			:radius="100"></uni-search-bar>
	</view>
	<!-- <uni-card margin="20px 10px 10px 10px"> -->
	<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="2000">
		<swiper-item v-for="(item,index) in bannerList" :key="index">
			<view class="swiper-item uni-bg-red">
				<image :src="item.url" alt="error"></image>
			</view>
		</swiper-item>
	</swiper>
	<!-- </uni-card> -->
	<uni-card margin="20px 1px 20px 1px" padding="1px" spacing="1px">
		<view class="homeMenu">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true">
				<view @tap="goTo(item.url,item.type)" v-for="(item, index) in menu" :index="index" class="item"
					:class="'nav-li bg-index' + (index + 1)">
					<view class="icon">
						<uni-icons :type="item.icon" color="#F0E7FE" size="50"></uni-icons>
					</view>
					<view class="text">{{item.name}}</view>
				</view>
			</scroll-view>
			<!-- <uni-grid :column="4" :highlight="true">
				<uni-grid-item @tap="goTo(item.url)" @click="goTo(item.url)" v-for="(item, index) in menu"
					:index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<view class="">
							<uni-icons :type="item.icon" size="60"></uni-icons>
						</view>
						<text class="text">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid> -->
		</view>
	</uni-card>
	<ListSkeleton :rows="4" v-if="loadingSkeleton">
	</ListSkeleton>
	<uni-card v-else margin="10px 8px 5px 8px" spacing="0px" padding="0px">
		<uni-section title="为您推荐" type="line" typeColor="#142d88">
			<template #right>
				<uni-icons @click="changeBatch" type="refresh" size="24" color="#142d88"></uni-icons>
			</template>
			<view v-if="recommendList.length===0" class="">
				<Empty width="160px" height="120px"></Empty>
			</view>
			<view v-else class="list">
				<view class="item" @tap="goToInner(item.bibId)"
					v-for="(item,index) in recommendList.slice(8*recommendIndex,8+8*recommendIndex)" :key="item.rank">
					<!-- <uni-card :border="false" shadow="0px 0px 0px 0px #fff" :is-shadow="false" padding="0px"
						margin="0px" :is-full="true"> -->
					<span class="order" :style="{backgroundColor:setColor(item.rank)}">{{item.rank}}</span>
					<span class="title">{{item.title}}</span>
					<!-- </uni-card> -->
				</view>
			</view>
		</uni-section>
	</uni-card>
</template>

<script setup lang="ts">
	import { onShow } from "@dcloudio/uni-app"
	import { ref, onMounted, Ref } from "vue"
	import { hotApi } from "@/api/huiwen/home"
	import { removeAuthorization } from "@/router/auth"
	import { loginAPI, login1API } from "@/api/user/user"
	import { loginFinalApi } from "@/api/end"
	import { statsApi } from "@/api/huiwen/center"

	const loadingSkeleton = ref(true)
	const menu = [
		{
			id: "",
			name: "我的借阅",
			url: "/page-center/mySubscribe",
			icon: "calendar"
		},
		{
			id: "",
			name: "智能答疑",
			url: "/page-home/consult",
			icon: "chatboxes",
			type: "inner"
		}, {
			id: "",
			name: "文献资源",
			url: "https://tsg.wust.edu.cn/info/1691/4471.htm",
			icon: "list",
			type: "tsg",
		}, {
			id: "",
			name: "借阅服务",
			url: "https://tsg.wust.edu.cn/jyfw/gzjsysy.htm",
			icon: "star",
			type: "tsg",
		}, {
			id: "",
			name: "科研服务",
			url: "https://tsg.wust.edu.cn/kyfw/xkfw.htm",
			icon: "paperplane",
			type: "tsg",
		}, {
			id: "",
			name: "互动交流",
			url: "https://tsg.wust.edu.cn/hdjl/syzydt.htm",
			icon: "chat",
			type: "tsg",
		}, {
			id: "",
			name: "读者指南",
			url: "https://tsg.wust.edu.cn/dzzn/gzzd.htm",
			icon: "map",
			type: "tsg",
		}, {
			id: "",
			name: "关于",
			url: "https://tsg.wust.edu.cn/gy.htm",
			icon: "flag",
			type: "tsg",
		}
	]
	const bannerList = ref([
		{
			url: "https://424neko.top:3001/images/background-img1.jpg"
		}, {
			url: "https://424neko.top:3001/images/background-img2.jpg"
		},
	])
	const recommendList : Ref<any[]> = ref([])

	const getRecommend = async () => {
		const res = await hotApi(16)
		if (res) {
			console.log(res);
			recommendList.value = res.data as []
		}
		// 无论请求成功与否，都关闭骨架屏
		loadingSkeleton.value = false
	}

	const setColor = (order : number) => {
		if (order === 1) {
			return "#ffbb3b"
		} else if (order === 2) {
			return "#d9dae3"
		} else if (order === 3) {
			return "#ff9d6a"
		} else {
			return ""
		}
	}

	const goTo = (url : string, type : string) => {
		console.log(url, type);
		if (type == "tsg") {
			uni.navigateTo({
				url: "/page-home/tsgview?url=" + url
			})
		} else {
			uni.navigateTo({
				url: url
			})
		}
	}
	// 推荐的书目，进入书籍详情
	const goToInner = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId
		})
	}

	onShow(() => {
		let fineSum = uni.getStorageSync("fineSum")
		console.log(typeof fineSum)
		// if (fineSum) {
		// 	uni.setTabBarBadge({
		// 		index: 3,
		// 		text: fineSum,
		// 		fail: (result : any) => {
		// 			console.log(result)
		// 		}
		// 	})
		// }
	})

	const login = async (loginInfo : any) => {
		console.log(typeof loginInfo)
		try {
			// 进入登录流程
			console.log(loginInfo.password)
			const res1 = await loginAPI(loginInfo)
			console.log('res', res1)
			const res2 = await login1API(res1.data)
			console.log('res2', res2)
			// 第三个接口，请求自己的后台，获取到Cookie
			let myCookie = await loginFinalApi(res2.data)
			console.log('Cookie', myCookie)
			// 登录成功后的处理
			uni.setStorageSync("loginState", true);
			uni.setStorageSync("Cookie", myCookie.data.cookie.split(';')[0]);
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
		fineSum: 0,// 我的欠款
	})
	const getStats = async () => {
		console.log("stats")
		const res : any = await statsApi()//取消api拦截器拦截
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
					}
				})
			}
		}
	}

	const recommendIndex = ref(0)
	// 换一换：改变展示的列表
	const changeBatch = () => {
		recommendIndex.value = (recommendIndex.value + 1) % 2
	}


	onMounted(() => {
		getRecommend()
		// 登录验证逻辑:
		// 用户没登录过：就跳过
		// 用户曾经登录过：请求看有没有401
		// 没有 跳出；有401重新登录
		console.log("loginState", uni.getStorageSync('loginState'))
		if (uni.getStorageSync('loginState')) {
			getStats()
		}
	})
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		justify-content: space-around;
		position: relative;
		margin: 0 0 3rpx 0;
		overflow: hidden;

		.logo {
			margin: auto 0;

			.logoImg {
				width: 5rem;
				height: 5rem;
				border-radius: 50px;
				margin: auto 0;
			}
		}

		.font {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.chinese {
				font-family: Comic Sans MS;
				font-size: 1.8rem;
				line-height: 1.8rem;
			}

			.english {
				font-family: Comic Sans MS;
				font-size: .6rem;
				line-height: .6rem;
			}
		}

		.background {
			position: absolute;
			z-index: -1;
			width: 100vw;
			max-height: 10rem;
			overflow: hidden;

			.background-img {
				width: 100vw;
			}
		}
	}

	.search {}

	swiper {
		height: 400rpx;

		image {
			width: 100vw;
		}
	}

	.homeMenu {
		flex-wrap: nowrap;
		overflow: hidden;
		white-space: nowrap;

		.item {
			display: inline-block;
			width: 5rem;
			height: 4rem;

			.text {
				font-size: 1.2rem;
				text-align: center;
				padding: auto;
			}

			.icon {
				padding: 0 auto;
				text-align: center;
				line-height: 60rpx;

				.uni-icons {}
			}

		}
	}

	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		margin: 30px 0 0 0;
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 200rpx;
		overflow: hidden;
		white-space: nowrap;
		border: 1px solid red;
	}

	.kite-classify-cell {
		border: 1px solid green;
		display: inline-block;
		width: 266rpx;
		height: 200rpx;
		margin-right: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: '';
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: '';
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 100rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954ff6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177ee;
		color: #fff;
	}

	.bg-index4 {
		background-color: #f49a02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #ff4f94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7fd02b;
		color: #fff;
	}

	.bg-index7 {
		background-color: #19cf8a;
		color: #fff;
	}

	.bg-index8 {
		background-color: #954ff6;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.list {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.item {
			// padding-left: 10px;
			height: 35px;
			border: none;
			width: 45%;
			align-items: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
		}
	}

	.title {
		width: 100%;
		font-size: 1rem;
		// margin: 2px;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	.order {
		display: inline-block;
		border-radius: 50%;
		// padding: 10px;
		width: 25px;
		align-items: center;
		text-align: center;
		height: 25px;
		// line-height: 12.5px;
	}
</style>