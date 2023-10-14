<template>
	<!-- <web-view :src="url"></web-view> -->
	<ul>
		<li v-for="(item,index) in list" @tap="goTo(item)" :key="index">{{item}}</li>
	</ul>
</template>

<script setup lang="ts">
	// web-view跳转tsg网页
	// import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	// const url = ref("https://tsg.wust.edu.cn/info/1431/3951.htm")
	const list = ref([
		"https://tsg.wust.edu.cn/info/1431/3951.htm",
		"https://tsg.wust.edu.cn/info/1691/4471.htm",
		'https://tsg.wust.edu.cn/info/1191/5001.htm',
		'https://tsg.wust.edu.cn/info/1191/4971.htm',
		'http://tsg.wust.edu.cn/hdjl/pxjzap.htm',
		'https://tsg.wust.edu.cn/hdjl/pxjzap.htm',
	])
	const goTo = (url : string) => {
		uni.navigateTo({
			url: "/page-home/tsgview?url=" + url
		})
	}
	// onLoad((e) => {
	// 	url.value = e.url
	// })
</script>

<style>
</style>