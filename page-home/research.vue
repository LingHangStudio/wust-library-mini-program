<template>
	<pages :idArray="idArray"></pages>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import pages from "./components/pages.vue"
	//***科研服务***
	//17 学科服务 
	//22 查收查引
	//69 图书报销
	//54 学位论文提交
	const idArray = ref([17, 22, 69, 54])
</script>

<style scoped lang="scss">
</style>