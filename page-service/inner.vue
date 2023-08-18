<template>
	<view v-if="article" class="">
		<view v-html="article" class="">
		</view>
	</view>


	<!-- <uni-card :title="article.title" margin="6px" :extra="article.createdAt.slice(0, 10)">
		<view class="details" v-if="article.showTitle">

			<view class="author"><span>作者: </span>{{ article.publisher }}</view>
			<view class="seeNum"><span>浏览次数: </span>{{ article.browse }}</view>
		</view>
		<view class="content" v-html="article.content"></view>
	</uni-card> -->
</template>

<script setup lang="ts">
	// import { getArticleContent } from "@/api/api.js"
	import { articleDetailApi } from "@/api/end/index.js"
	import { onLoad } from "@dcloudio/uni-app"
	import { ref,  } from "vue";
	const url = ref()
	const article = ref("")
	onLoad((e : any) => {
		url.value = e.url
		getArticle(e.url)
	})
	const getArticle = async (url) => {
		const res = await articleDetailApi(url)
		if (res) {
			console.log("detail", res);
			article.value = res.data.content.replaceAll("form","div")
		}
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