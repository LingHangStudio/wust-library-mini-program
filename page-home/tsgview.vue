<template>
	<web-view :src="url"></web-view>
</template>

<script setup lang="ts">
	// web-view跳转tsg网页
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	const url = ref("")
	onLoad((e) => {
		url.value = e.url
	})
</script>

<style>
</style>