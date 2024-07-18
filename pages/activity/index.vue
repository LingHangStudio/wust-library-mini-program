<template>
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<view v-else class="content">
		<view v-for="(item, index) in all" :key="index" class="item" @tap="goTo(item.link,item.id)">
			<uni-card margin="5px" padding="3px">
				<view class="box">
					<view style="marginright: 3px" class="">
						<image v-if="(item.tag = '资源')" style="display: block; width: 40px; height: 40px"
							src="@/static/resource.png" alt="" />
						<image v-else-if="item.tag" style="display: block; width: 40px; height: 40px"
							src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="" />
						<image v-else style="display: block; width: 40px; height: 40px" src="@/static/logo.png"
							alt="Error" />
					</view>
					<view class="font">
						<view class="title">
							{{ item.title }}
						</view>
					</view>
					<view style="min-width: 3rem" class="tag">
						<uni-tag :text="item.tag" type="primary" circle></uni-tag>
					</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { addArticleView, articleListApi } from "@/api/end/index"

	const loading = ref(true)
	const all = ref([])

	const getArticle = async () => {
		const res = await articleListApi()
		if (res.code === 200) {
			all.value = res.data.rows
		}
		loading.value = false
	}
	getArticle()

	// 弹出层信息：提示跳转webview
	const routerUrl = ref("/page-service/tsgview?url=")

	const goTo = async (link : string, id : number) => {
		const res = await addArticleView(id)
		uni.navigateTo({
			url: routerUrl.value + link,
		})

	}
</script>

<style scoped lang="scss">
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