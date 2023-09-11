<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view v-if="showList.length===0" class="">
			<Empty></Empty>
		</view>
		<scroll-view scroll-y
			@scrolltolower="getArticleList({currentPage:paginations.currentPage+1,pageNum:paginations.pageNum})"
			:lower-threshold="30" style="height: 100vh" v-else>
			<view class="list">
				<view @tap="goTo(item.url)" v-for="(item,index) in showList" class="item" :key="index">
					<uni-card margin="3px" padding="3px" :is-full="true">
						<view class="box">
							<view style="margin: 3px;" class="">
								<img style=" display: block;width: 40px;height: 40px;"
									src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
							</view>
							<view class="font">
								<view class="">
									{{item.title}}
								</view>
								<view class="">
									{{item.date}}
								</view>
							</view>
						</view>
					</uni-card>
				</view>
				<view style="text-align: center;padding: 3px;">到底啦！</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import Empty from "@/components/Empty.vue"
	import { onReachBottom, onPageScroll } from "@dcloudio/uni-app"
	import { ref, onMounted, Ref } from "vue"
	import type { paginationType } from "@/utils/types/list"
	import { articleListApi } from "@/api/end/index"
	const items = ref(['最新资源', "最新消息"])

	// 通知公告列表
	const noticeList = ref([])
	// 最新资源
	const reourseList = ref([])
	const showList = ref([])
	const toBottom = ref(false)
	// 分页信息
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})

	// 选择分栏
	const current = ref(0)
	const onClickItem = (e : any) => {
		toBottom.value = false
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			showList.value = e.currentIndex == 0 ? reourseList.value : noticeList.value
		}
	}
	const getArticleList = async (pagination : paginationType) => {
		// 新接口:获取资源和公告
		const resResource = await articleListApi({ ...pagination, category: 3, type: 3 })
		if (resResource) {
			reourseList.value = reourseList.value.concat(resResource.data)
			showList.value = reourseList.value
		}
		const resNotice = await articleListApi({ ...pagination, category: 1, type: 1, })
		if (resNotice) {
			noticeList.value = noticeList.value.concat(resNotice.data)
		}
	}
	const goTo = (url : string) => {
		uni.navigateTo({
			url: "/page-service/inner?url=" + url
		})
	}
	onMounted(() => {
		getArticleList(paginations.value)
	})

	onReachBottom(() => {
		toBottom.value = true
	})
</script>

<style scoped lang="scss">
	.content {
		.list {
			.item {
				.head {
					font-size: 1.5rem;
					margin: 3px;
				}

				.body {
					display: flex;
					flex-direction: row;

					.line {
						width: 3px;
						height: 1.2rem;
						margin: 0 3px;
						background-color: firebrick;
					}
				}

			}
		}
	}

	.box {
		display: flex;

		.line {
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			margin: auto 0;
			font-size: 1rem;
			line-height: 1rem;
		}
	}
</style>