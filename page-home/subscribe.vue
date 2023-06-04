<template>
	<pages :idArray="idArray"></pages>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import pages from "./components/pages.vue"
	//借阅服务
	//37馆藏检索与使用
	//45是借阅规则
	//40 服务时间及馆藏分布
	const idArray : any = ref([37, 45, 40])
</script>

<style scoped lang="scss">
</style>