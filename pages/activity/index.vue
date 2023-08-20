<template>
	<uni-notice-bar show-icon text="最新活动: 暑假活动 | 共读打卡活动，等你来参加！" />
	<view class="content">
		<view v-if="all.length===0" class="">
			<Empty></Empty>
		</view>
		<scroll-view scroll-y
			@scrolltolower="getArticle({currentPage:paginations.currentPage+1,pageNum:paginations.pageNum})"
			:lower-threshold="30" style="height: 100vh" v-else>
			<view class="list">
				<view @tap="goTo(item.url)" v-for="(item,index) in all" :key="index" class="item">
					<uni-card margin="3px" padding="3px" :is-full="true">
						<view class="box">
							<view style="margin: 3px;" class="">
								<img v-if="item.tag='资源'" style=" display: block;width: 40px;height: 40px;"
									src="@/static/resource.png" alt="">
								<img v-else-if="item.tag" style=" display: block;width: 40px;height: 40px;"
									src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
								<img v-else style=" display: block;width: 40px;height: 40px;" src="@/static/logo.png"
									alt="Error">
							</view>
							<view class="font">
								<view class="">
									{{item.title}}
								</view>
								<view class="">
									{{item.date}}
								</view>
							</view>
							<view style="min-width: 3rem;" class="tag">
								<uni-tag :text="item.tag" type="primary" circle></uni-tag>
							</view>
						</view>
					</uni-card>
				</view>
				<view style="text-align: center;padding: 3px;">到底啦！</view>
			</view>

			<!-- <view v-if="current === 1">
			<view v-html="lectureArticle.content"></view>
		</view>
		<view v-if="current === 3">
			<view v-html="readArticle.content"></view>
			<view v-for="(item,index) in readList" class="">
				{{item.title}}
			</view>
		</view> -->
		</scroll-view>
	</view>
	<!-- <view v-if="current === 0||current===2" style="text-align: center;padding: 5px;">到底啦！</view> -->
	<!-- <view @tap="toTop" v-show="toBottom" class="top">
		<uni-icons type="top" size="30px"></uni-icons>
	</view> -->
</template>

<script setup lang="ts">
	import Empty from "@/components/Empty.vue"
	import { onReachBottom, onPageScroll } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { articleListApi } from "@/api/end/index.js"
	const all = ref([])
	const toBottom = ref(false)
	// 分页信息
	const paginations = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})
	const getArticle = async () => {
		const res = await articleListApi({ category: 2, type: 2, ...paginations.value })
		if (res) {
			console.log("resActivity", res)
			all.value = all.value.concat(res.data)
		}
	}
	getArticle()

	onReachBottom(() => {
		toBottom.value = true
	})
	onPageScroll((e) => {
		console.log();
	})

	const goTo = (url) => {
		uni.navigateTo({
			url: "/page-service/inner?url=" + url
		})
	}

	// const toTop = () => {
	// 	uni.pageScrollTo({
	// 		scrollTop: 0,   // 滚动到页面的目标位置  这个是滚动到顶部, 0
	// 		duration: 300  // 滚动动画的时长
	// 	})
	// 	toBottom.value = false
	// }
</script>

<style scoped lang="scss">
	.box {
		display: flex;

		.line {
			// display: inline-block;
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			// overflow: hidden;
			// flex-wrap: nowrap;
			// display: inline-block;
			// word-break: keep-all;
			// white-space: nowrap;
			margin: auto 0;
			font-size: 1rem;
			line-height: 1rem;
		}
	}

	// .top {
	// 	position: fixed;
	// 	bottom: 40px;
	// 	right: 15px;
	// 	border-radius: 50%;
	// 	border: 1px solid gray;
	// 	padding: 3px;
	// 	background-color: #fff;
	// }
</style>