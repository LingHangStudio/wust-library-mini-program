<template>
	<uni-pagination :total="contentList.length" page-size="1" @change="changePage" :current="currentPage+1"
		prev-text="前一页" next-text="后一页" />

	<uni-section :padding="true" titleFontSize="20px" :title="contentList[currentPage].title" type="line">
		<view class="" v-html="contentList[currentPage].content">
		</view>
	</uni-section>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { getArticleContent } from "@/api/api.js"
	const props = defineProps({
		idArray: {
			type: Array
		}
	})
	console.log(props.idArray);
	const contentList = ref([])
	const currentPage = ref(0)

	async function getContent() {
		let temp = props.idArray
		for (let i = 0; i < temp.length; i++) {
			let res = await getArticleContent({ id: temp[i] });
			contentList.value.push(res.data)
		}
	}
	// onLoad(() => {
	// 	getContent()
	// })
	getContent()
	const changePage = (e) => {
		console.log(e);
		currentPage.value = e.current - 1
	}
</script>

<style scoped lang="scss">
</style>