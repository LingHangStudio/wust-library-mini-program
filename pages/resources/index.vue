<template>
	<uni-segmented-control :current="current" style-type="text" active-color="#142d88" :values="items"
		@click-item="onClickItem" />
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<List v-else :list-length="showList.length" :page="paginations.currentPage" :page-size="paginations.pageNum"
		@get-more="getArticleList(paginations.currentPage + 1, paginations.pageNum)">
		<view v-for="(item, index) in showList" :key="index" class="item" @tap="goTo(item.url)">
			<uni-card margin="7px" padding="3px">
				<view class="box">
					<view style="margin: 3px" class="">
						<img style="display: block; width: 40px; height: 40px"
							src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="" />
					</view>
					<view class="font">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="date">
							{{ item.date }}
						</view>
					</view>
				</view>
			</uni-card>
		</view>
	</List>

	<uni-popup ref="tsgDialog" type="dialog" @mask-click="tsgDialog.close()">
		<uni-popup-dialog type="warn" cancel-text=" 不再提醒" confirm-text="我知道了" title="提示" @confirm="dialogConfirm"
			@close="dialogClose">
			<view class="tipBox">
				<view>即将跳转武科大图书馆官网</view>
				<view>为更加完美体验</view>
				<view>建议使用浏览器打开链接</view>
				<view class="" @tap="copyUrl">
					<view class="url">{{ urlTo }}</view>
					<span>（点击复制）</span>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script setup lang="ts">
	import { ref, onMounted, Ref } from "vue"
	import type { paginationType } from "@/utils/types/list"
	import { articleListApi } from "@/api/end/index"
	const loading = ref(true)
	const items = ref(["最新资源", "最新消息"])

	const showList = ref([])

	// 分栏
	const current = ref(0)
	// 分页信息
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0,
	})

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
			}
		} else {
			const resNotice = await articleListApi({ page, pageSize, category: 1, type: 1 })
			if (resNotice) {
				showList.value = showList.value.concat(resNotice.data)
				paginations.value = {
					currentPage: page,
					pageNum: pageSize,
				}
			}
		}
		loading.value = false
	}

	// 选择分栏
	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			paginations.value = {
				currentPage: 1,
				pageNum: 10,
				total: 0,
			}
			loading.value = true
			showList.value = []
			getArticleList(1, 10)
		}
	}

	onMounted(() => {
		getArticleList(paginations.value.currentPage, paginations.value.pageNum)
	})

	// 弹出层配置
	const urlTo = ref("")
	const routerUrl = ref("/page-service/tsgview?url=")
	const tsgDialog = ref(null)

	const dialogConfirm = () => {
		uni.navigateTo({
			url: routerUrl.value + urlTo.value,
		})
	}

	const dialogClose = () => {
		uni.setStorageSync("noViewTip", true)
		uni.navigateTo({
			url: routerUrl.value + urlTo.value,
		})
	}

	const copyUrl = () => {
		uni.setClipboardData({
			data: urlTo.value,
		})
	}

	const goTo = (url : string) => {
		urlTo.value = url
		if (uni.getStorageSync("noViewTip")) {
			uni.navigateTo({
				url: routerUrl.value + url,
			})
		} else {
			tsgDialog.value.open()
		}
	}
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
				color: #1c1c1c;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				/*行数*/
				-webkit-box-orient: vertical;
				display: -moz-box;
				-moz-line-clamp: 2;
				-moz-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
				white-space: normal;
			}

			.date {
				font-size: 14px;
				color: #9a9999;
			}
		}
	}

	.url {
		color: $theme-color;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	.tipBox {
		width: 100%;
		margin: 0px 15px;

		& {
			line-height: 1.5rem;
		}
	}
</style>