<template>
	<view>
		<uni-segmented-control :current="current" styleType="text" activeColor="#142d88" :values="items"
			@clickItem="onClickItem" />
	</view>

	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<List v-else @getMore="getArticleList(paginations.currentPage+1,paginations.pageNum)" :listLength="showList.length"
		:page="paginations.currentPage" :pageSize="paginations.pageNum">
		<template>
			<view @tap="goTo(item.url)" v-for="(item,index) in showList" class="item" :key="index">
				<uni-card margin="5px" padding="3px">
					<view class="box">
						<view style="margin: 3px;" class="">
							<img style=" display: block;width: 40px;height: 40px;"
								src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
						</view>
						<view class="font">
							<view class="title">
								{{item.title}}
							</view>
							<view class="date">
								{{item.date}}
							</view>
						</view>
					</view>
				</uni-card>
			</view>
		</template>
	</List>
</template>

<script setup lang="ts">
	import { ref, onMounted, Ref } from "vue"
	import type { paginationType } from "@/utils/types/list"
	import { articleListApi } from "@/api/end/index"
	const loading = ref(true)
	const items = ref(['最新资源', "最新消息"])

	const showList = ref([])
	// 分页信息
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})

	// 选择分栏
	const current = ref(0)
	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			paginations.value = {
				currentPage: 1,
				pageNum: 10,
				total: 0
			}
			loading.value = true
			showList.value = []
			getArticleList(1, 10)
		}
	}
	const getArticleList = async (page : number, pageSize : number) => {
		// 新接口:获取资源和公告
		if (current.value === 0) {
			const resResource = await articleListApi({ page, pageSize, category: 3, type: 3 })
			if (resResource) {
				showList.value = showList.value.concat(resResource.data)
				paginations.value = {
					currentPage: page,
					pageNum: pageSize,
				}
				showList.value.sort((a, b) => {
					const dateA : any = new Date(a.date);
					const dateB : any = new Date(b.date);
					return dateA - dateB;
				});
			}
		} else {
			const resNotice = await articleListApi({ page, pageSize, category: 1, type: 1, })
			if (resNotice) {
				showList.value = showList.value.concat(resNotice.data)
				paginations.value = {
					currentPage: page,
					pageNum: pageSize,
				}
				showList.value.sort((a, b) => {
					const dateA : any = new Date(a.date);
					const dateB : any = new Date(b.date);
					return dateB - dateA;
				});
				console.log("showlist", showList.value)
			}
		}
		loading.value = false
	}
	const goTo = (url : string) => {
		uni.navigateTo({
			url: "/page-service/inner?url=" + url
		})
	}
	onMounted(() => {
		getArticleList(paginations.value.currentPage, paginations.value.pageNum)
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
		align-items: center;
		min-height: 57px;

		.line {
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			align-items: center;
			// margin: auto 0;
			// line-height: 1rem;
			margin-left: 2px;
			padding: 3px 0;

			.title {
				font-size: 18px;
				color: #1C1C1C;
			}

			.date {
				font-size: 14px;
				color: #9a9999;
			}
		}
	}
</style>