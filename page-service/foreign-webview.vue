<template>
	<web-view :src="goToLink"></web-view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	const goToLink = ref("")
	const goTo = (value) => {
		//
		// console.log(value);
		goToLink.value = "https://libsys.wust.edu.cn/space/reader/readerHome"
	}
	onLoad((e) => {
		if (e) {
			goTo(e)
		}
	})
</script>

<style>
</style>