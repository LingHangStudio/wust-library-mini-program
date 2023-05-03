<template>
	<uni-card :title="article.title" margin="6px" :extra="article.createdAt.slice(0, 10)">
		<!-- <view class="title" v-if="article.showTitle">
			{{ article.title }}
		</view> -->
		<view class="details" v-if="article.showTitle">
			<!-- <view class="time">
				<span>发布时间: </span>{{ article.createdAt.slice(0, 10) }}
			</view> -->
			<view class="author"><span>作者: </span>{{ article.publisher }}</view>
			<view class="seeNum"><span>浏览次数: </span>{{ article.browse }}</view>
		</view>
		<view class="content" v-html="article.content"></view>
	</uni-card>
</template>

<script setup lang="ts">
	import { getArticleContent } from "@/api/api.js"
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, onMounted } from "vue";
	const id = ref()
	const article = ref({
		address: "",
		browse: "",
		categoryId: "",
		content: "",
		title: "",
		createdAt: [],
		publisher: ""
	})
	onLoad((e) => {
		id.value = e
		getArticle(e)
	})
	async function getArticle(id) {
		const res = await getArticleContent(id)
		console.log(res);
		article.value = res.data
	}
	// onMounted(() => {
	// 	getArticle()
	// })
</script>

<style scoped lang='scss'>
	.title {}

	.details {
		display: flex;
		justify-content: space-around;
	}

	.content {}
</style>