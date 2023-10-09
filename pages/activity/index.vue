<template>
	<uni-notice-bar v-if="all[0]" show-icon :text="all[0].title" />
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<view v-else class="content">
		<List @getMore="getArticle(paginations.currentPage+1,paginations.pageNum)" :listLength="all.length"
			:page="paginations.currentPage" :pageSize="paginations.pageNum">
			<template>
				<view @tap="goTo(item.url)" v-for="(item,index) in all" :key="index" class="item">
					<uni-card margin="5px" padding="3px">
						<view class="box">
							<view style="marginRight: 3px;" class="">
								<img v-if="item.tag='资源'" style=" display: block;width: 40px;height: 40px;"
									src="@/static/resource.png" alt="">
								<img v-else-if="item.tag" style=" display: block;width: 40px;height: 40px;"
									src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
								<img v-else style=" display: block;width: 40px;height: 40px;" src="@/static/logo.png"
									alt="Error">
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
			</template>
		</List>
	</view>
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
			all.value.sort((item1 : any, item2 : any) => {
				return Date.parse(item2.date) - Date.parse(item1.date)
			})
			console.log('all', all.value)
		}
		loading.value = false
	}
	getArticle(paginations.value.currentPage, paginations.value.pageNum)

	const goTo = (url : string) => {
		uni.navigateTo({
			url: "/page-service/inner?url=" + url
		})
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
			}

			.date {
				font-size: 14px;
				color: #9a9999;
			}
		}
	}
</style>