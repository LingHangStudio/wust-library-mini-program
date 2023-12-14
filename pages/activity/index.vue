<template>
	<uni-notice-bar v-if="all[0]" show-icon :text="all[0].title" />
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<view v-else class="content">
		<List @getMore="getArticle(paginations.currentPage+1,paginations.pageNum)" :listLength="all.length"
			:page="paginations.currentPage" :pageSize="paginations.pageNum">
			<view @tap="goTo(item.url)" v-for="(item,index) in all" :key="index" class="item">
				<uni-card margin="5px" padding="3px">
					<view class="box">
						<view style="marginRight: 3px;" class="">
							<image v-if="item.tag='资源'" style=" display: block;width: 40px;height: 40px;"
								src="@/static/resource.png" alt="" />
							<image v-else-if="item.tag" style=" display: block;width: 40px;height: 40px;"
								src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="" />
							<image v-else style=" display: block;width: 40px;height: 40px;" src="@/static/logo.png"
								alt="Error" />
						</view>
						<view class="font">
							<view class="title">
								{{item.title}}
							</view>
							<view class="date">
								{{item.date}}
							</view>
						</view>
						<view style="min-width: 3rem;" class="tag">
							<uni-tag :text="item.tag" type="primary" circle></uni-tag>
						</view>
					</view>
				</uni-card>
			</view>
		</List>
	</view>
	<uni-popup ref="tsgDialog" type="dialog" @maskClick="tsgDialog.close()">
		<uni-popup-dialog type="warn" cancelText="不再提醒" confirmText="我知道了" title="提示" @confirm="dialogConfirm"
			@close="dialogClose">
			<view class="tipBox">
				<view>即将跳转武科大图书馆官网</view>
				<view>为更加完美体验</view>
				<view>建议使用浏览器打开链接</view>
				<view @tap="copyUrl" class="">
					<view class="url">{{urlTo}}</view>
					<span>（点击复制）</span>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script setup lang="ts">
	import { ref, Ref } from "vue"
	import type { paginationType } from "@/utils/types/list"
	import { articleListApi } from "@/api/end/index"

	const loading = ref(true)
	const all = ref([])
	// 分页信息
	const paginations : Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})
	const getArticle = async (page : number, pageSize : number) => {
		const res = await articleListApi({ category: 2, type: 2, page, pageSize })
		if (res) {
			all.value = all.value.concat(res.data)
			paginations.value = {
				currentPage: page,
				pageNum: pageSize,
			}
		}
		loading.value = false
	}
	getArticle(paginations.value.currentPage, paginations.value.pageNum)

	// 弹出层信息：提示跳转webview
	const urlTo = ref("")
	const routerUrl = ref('/page-service/tsgview?url=')
	const tsgDialog = ref(null)

	const dialogConfirm = () => {
		uni.navigateTo({
			url: routerUrl.value + urlTo.value
		})
	}

	const dialogClose = () => {
		uni.setStorageSync('noViewTip', true)
		uni.navigateTo({
			url: routerUrl.value + urlTo.value
		})
	}

	const copyUrl = () => {
		uni.setClipboardData({
			data: urlTo.value
		});
	}

	const goTo = (url : string) => {
		urlTo.value = url
		if (uni.getStorageSync("noViewTip")) {
			uni.navigateTo({
				url: routerUrl.value + url
			})
		} else {
			tsgDialog.value.open()
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #F5F7F9;
		// height: 100vh;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 57px;

		.line {
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			align-items: center;
			margin: 0;
			// padding: 3px 0;
			// line-height: 1rem;
			padding: 5px 0;

			.title {
				font-size: 18px;
				color: #1C1C1C;
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