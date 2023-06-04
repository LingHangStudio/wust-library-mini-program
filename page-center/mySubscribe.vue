<template>
	<scroll-view v-for="(item,index) in lists" :key="index" class="item">
		<uni-card margin="8px" :title="item.name">
			<div>
				索书号：{{item.search}}</div>
			<div>ISBN:{{item.ISBN}}</div>
			<div>出版年:{{item.pubilsh}}</div>
		</uni-card>
	</scroll-view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const user = uni.getStorageSync("user")
	const lists = ref([
		{
			id: "123",
			name: "平凡的世界",
			pubilsh: "2012",
			ISBN: "978-7-5302",
			writer: "路遥",
			search: "I247.57"
		}, {
			id: "123",
			name: "数据库原理与开发技术",
			pubilsh: "2023",
			ISBN: "978-7-111-71695",
			writer: "艾小伟",
			search: "TP311.13"
		}, {
			id: "123",
			name: "javascript高级程序设计",
			pubilsh: "2020",
			ISBN: "978-7-115-54538-1",
			writer: "马特",
			search: "TP312.8"
		},

	])
	const getMyList = () => {
		const res = 0
	}
</script>

<style scoped lang="scss">
	// .item {
	// 	margin: 3px 1px;
	// 	border-bottom: 1px solid black;
	// }
</style>