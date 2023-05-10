<template>
	<view class="head">
		<view class="logo">
			<img class="logoImg" src="../../static/logo.png" alt="">
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
	<view class="search">
		<uni-search-bar @focus="goTo('/page-service/search')" cancelButton="none" @confirm="search"
			v-model="searchValue" placeholder="搜索书名,作者,分类,IBSN" :radius="100"></uni-search-bar>
	</view>
	<!-- <uni-card margin="20px 10px 10px 10px"> -->
	<swiper class="swiper" :indicator-dots="true" circular :autoplay="true" :interval="2000">
		<swiper-item v-for="(item,index) in bannerList" :key="index">
			<view class="swiper-item uni-bg-red">
				<img :src="item.url" alt="error">
			</view>
		</swiper-item>
	</swiper>
	<!-- </uni-card> -->
	<uni-card margin="30px 1px 30px 1px" padding="1px" spacing="1px">
		<view class="homeMenu">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true">
				<view @tap="goTo(item.url)" @click="goTo(item.url)" v-for="(item, index) in menu" :index="index"
					class="item" :class="'nav-li bg-index' + (index + 1)">
					<view class="icon">
						<uni-icons :type="item.icon" size="60"></uni-icons>
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
	<uni-card margin="10px 8px 5px 8px" padding="0px">
		<uni-section title="为您推荐" type="line">
			<uni-group>
				<view @tap="goToInner(item.id)" v-for="(item,index) in recommendList" :key="index">
					<uni-card :is-full="true">
						{{item.title}}
					</uni-card>
				</view>
			</uni-group>
		</uni-section>
	</uni-card>

</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from "vue"
	import { banner, getDisciplineCate } from "@/api/api.js"
	// import { fileToBase64 } from "@/utils/toBase64.js"
	const searchValue = ref("")
	const menu = [
		{
			id: "",
			name: "我的借阅",
			url: "",
			icon: "calendar"
		}, {
			id: "",
			name: "我的预约",
			url: "",
			icon: "star-filled"
		}, {
			id: "",
			name: "智能答疑",
			url: "/page-home/consult",
			icon: "chatboxes-filled"
		}, {
			id: "",
			name: "预约服务",
			url: "",
			icon: "paperplane"
		}, {
			id: "",
			name: "馆藏分布",
			url: "/page-service/inner?id=40",
			icon: "location-filled"
		}, {
			id: "",
			name: "标签",
			url: "",
			icon: "flag"
		}, {
			id: "",
			name: "关于",
			url: "",
			icon: "flag"
		},

	]
	const bannerList = ref([])
	const recommendList = ref([
		{
			address: null,
			browse: 83,
			categoryId: 50,
			createdAt: "2023-02-22T08:59:45.000Z",
			description: null,
			endTime: null,
			followCateName: "试用资源",
			href: "",
			id: 51730,
			publisher: "admin",
			showTitle: 1,
			speaker: null,
			startTime: null,
			tag: "",
			title: "IGI Global e-Book Collection试用通知"
		}, {
			address: null,
			browse: 83,
			categoryId: 50,
			createdAt: "2023-02-22T08:59:45.000Z",
			description: null,
			endTime: null,
			followCateName: "试用资源",
			href: "",
			id: 51730,
			publisher: "admin",
			showTitle: 1,
			speaker: null,
			startTime: null,
			tag: "",
			title: "IGI Global e-Book Collection试用通知"
		}, {
			address: null,
			browse: 83,
			categoryId: 50,
			createdAt: "2023-02-22T08:59:45.000Z",
			description: null,
			endTime: null,
			followCateName: "试用资源",
			href: "",
			id: 51730,
			publisher: "admin",
			showTitle: 1,
			speaker: null,
			startTime: null,
			tag: "",
			title: "IGI Global e-Book Collection试用通知"
		},
	])
	async function getBanner() {
		const res = await banner();
		bannerList.value = res.data
	}


	const search = () => { }


	async function recommend() {
		const res = await getDisciplineCate()
		console.log("推荐");
		console.log(res);
	}


	const goTo = (url) => {
		console.log(url);
		uni.navigateTo({
			url: url
		})
	}
	const goToInner = (id) => {
		uni.navigateTo({
			url: "/pages/service/inner?id=" + id
		})
	}
	const isWechatLogin = () => {

	}

	onMounted(() => {
		// fileToBase64("@/static/luxun.otf")
		getBanner()
		recommend()
	})
</script>

<style lang="scss" scoped>
	.head {
		// border: 1px solid red;
		// top: 3px;
		display: flex;
		justify-content: space-around;
		position: relative;
		// border: 1px solid red;
		// background: url("../../static/library.png") repeat fixed center;
		margin: 0 0 3rpx 0;
		overflow: hidden;

		.logo {
			// margin: auto;
			margin: auto 0;


			.logoImg {
				width: 5rem;
				height: 5rem;
				border-radius: 50px;
				margin: auto 0;
			}
		}


		.font {

			// border: 1px solid red;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.chinese {
				// border: 1px solid red;

				// margin: auto 0;
				font-family: Comic Sans MS;
				font-size: 1.8rem;
				line-height: 1.8rem;
			}

			.english {
				// margin: auto 0;
				// border: 1px solid red;
				font-family: Comic Sans MS;
				font-size: .6rem;
				line-height: .6rem;
			}
		}

		.background {
			position: absolute;
			z-index: -1;
			// border: 1px solid red;
			width: 100vw;
			max-height: 10rem;
			overflow: hidden;

			.background-img {
				width: 100vw;
				// max-height: 10rem;
				// overflow: hidden;
			}
		}
	}

	.search {
		// border: 1px solid red;
	}

	swiper {
		// width: 750rpx;
		height: 400rpx;

		image {
			width: 100vw;
			// height: 100%;
		}
	}


	.homeMenu {
		// margin: 30px .3rem;
		// border: 1px solid red;
		// display: flex;
		flex-wrap: nowrap;
		overflow: hidden;
		// border: 1px solid red;
		white-space: nowrap;

		.item {
			// border: 1px solid blue;
			// width: 50rpx;

			display: inline-block;
			height: 50rem;
			width: 6rem;
			height: 5rem;
			// background-color: gray;
			// line-height: 2rem;
			// transform: translateX(-2rem);

			.text {
				font-size: 1.4rem;
				text-align: center;
			}

			.icon {
				// height: 5rem;
				padding: 0 auto;
				// border: 2px solid red;
				text-align: center;
				line-height: 100rpx;

				.uni-icons {
					// line-height: 4px;
				}
			}

		}
	}


	// test

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
		// display: inline-block;
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

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>