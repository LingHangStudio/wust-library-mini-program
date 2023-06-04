<template>
	<pages :idArray="idArray"></pages>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import pages from "./components/pages.vue"
	//***关于本馆服务 id=32***
	//56 关于本馆
	//59 馆舍平面
	//58 机构设置
	//55 分馆

	const idArray = ref([56, 59, 58, 55])
</script>

<style scoped lang="scss">
</style>