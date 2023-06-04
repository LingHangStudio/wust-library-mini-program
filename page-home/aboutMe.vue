<template>
	<pages :idArray="idArray"></pages>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import pages from "./components/pages.vue"
	//***关于本馆服务 id=32***
	//59 关于本馆
	//58 机构设置
	//55 分馆

	const idArray = ref([56, 59, 58])
</script>

<style scoped lang="scss">
</style>