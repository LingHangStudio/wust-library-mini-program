<template>
	<web-view :src="url"></web-view>
</template>

<script setup lang="ts">
	// web-view跳转tsg网页:主页菜单栏，活动，资源列表
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	const url = ref("")
	onLoad((e) => {
		let rawUrl = e.url
		rawUrl.replace(/^http/, "https")
		url.value = rawUrl
	})
</script>

<style>
</style>