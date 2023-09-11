<template>
	<uni-notice-bar show-icon text="最新活动: 暑假活动 | 共读打卡活动，等你来参加！" />
	<view class="content">
		<view v-if="all.length===0" class="">
			<Empty description="暂无活动"></Empty>
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
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import Empty from "@/components/Empty.vue"
	import { onReachBottom, onPageScroll } from "@dcloudio/uni-app"
	import { ref,Ref } from "vue"
	import type { paginationType } from "@/utils/types/list"
	import { articleListApi } from "@/api/end/index"
	const all = ref([])
	const toBottom = ref(false)
	// 分页信息
	const paginations:Ref<paginationType> = ref({
		currentPage: 1,
		pageNum: 10,
		total: 0
	})
	const getArticle = async (pagination) => {
		const res = await articleListApi({ category: 2, type: 2, ...pagination })
		if (res) {
			console.log("resActivity", res)
			all.value = all.value.concat(res.data)
		}
	}
	getArticle(paginations.value)
	onReachBottom(() => {
		toBottom.value = true
	})
	onPageScroll((e) => {
		console.log();
	})

	const goTo = (url : string) => {
		uni.navigateTo({
			url: "/page-service/inner?url=" + url
		})
	}
</script>

<style scoped lang="scss">
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