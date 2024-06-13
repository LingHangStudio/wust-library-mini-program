<template>
	<web-view :src="url"></web-view>
</template>

<script setup lang="ts">
	// web-view跳转tsg网页:主页菜单栏，活动，资源列表
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	const url = ref("")
	onLoad((e) => {
		url.value = "https://chatbot.weixin.qq.com/webapp/HIsRh8vT25AHKfzXhYrhufodkOACze?robotName=%E7%A7%91%E5%A4%A7%E5%9B%BE%E4%B9%A6%E7%B2%BE%E7%81%B5"
	})
</script>

<style>
</style>