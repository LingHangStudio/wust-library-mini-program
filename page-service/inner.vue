<template>
	<view v-if="article" class="root">
		<view v-html="article" class="">
		</view>
	</view>
</template>

<script setup lang="ts">
	import { articleDetailApi } from "@/api/end"
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, } from "vue";
	const url = ref()
	const article = ref("")

	const getArticle = async (url : string) => {
		const res = await articleDetailApi(url)
		res && (article.value = res.data.content.replaceAll("form", "div"))
	}

	onLoad((e : any) => {
		url.value = e.url
		getArticle(e.url)
	})
</script>

<style scoped lang='scss'>
	.root {
		margin: 1px 6px;
		padding: 4px;
	}
</style>