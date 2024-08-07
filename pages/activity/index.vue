<template>
	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<view v-else class="content">
		<view v-for="(item, index) in all" :key="index" class="item" @tap="goTo(item.link)">
			<uni-card margin="5px" padding="3px">
				<view class="box">
					<view class="icon">
						<!-- 看似三个判断实际上后端没给枚举，你前端无法判断，所以下面直接判断存在给图片，如果之后有要求需要分类可以去https://www.iconfont.cn/找然后下载进入static里面 -->
						<image v-if="(item.tag)" style="display: block; width: 40px; height: 40px"
							src="@/static/resource.png" alt="" />
						<image v-else-if="(item.tag === '通知')" style="display: block; width: 40px; height: 40px"
								src="@/static/notic.png" alt="" />
						<image v-else style="display: block; width: 40px; height: 40px" src="@/static/logo.png"
							alt="Error" />
					</view>
					<!-- 中间的文字部分 -->
					<view class="font">
						<view class="title">
							{{ item.title }}
						</view>
					</view>
                  <!-- 最后的一个标签圆圈 -->
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
	import { articleListApi } from "@/api/end/index"

	const loading = ref(true)
	const all = ref([])

//获取文章
	const getArticle = async () => {
		const res = await articleListApi()	
		if (res.code === 200) {
			all.value = res.data.rows
			console.log(all.value)
		}
		loading.value = false
	}
	getArticle()

//跳转到相应页面
	const goTo = async (url : string) => {
		uni.navigateTo({
			url: "/page-service/tsgview?url=" + url,
		})

	}
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 57px;
		
		.icon{
			padding: 0 15px 0 0;
		}

		.line {
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			align-items: center;
			margin: 0;
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