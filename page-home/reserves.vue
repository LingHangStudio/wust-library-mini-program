<template>
	<pages :idArray="idArray"></pages>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import pages from "./components/pages.vue"
	//***预约服务***
	//49 座位预约
	//27研讨空间预约
	//25自助服务

	//*** 数据展示
	// 68 数据展示

	const idArray = ref([49, 27, 25, 68])
</script>

<style scoped lang="scss">
</style>