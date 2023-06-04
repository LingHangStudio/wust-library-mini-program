<template>
	<view class="root">
		<view v-for="(item,index) in lists" :key="index" class="item">
			<p>{{item.name}}</p>
			<div>
				索书号：{{item.search}}</div>
			<div>ISBN:{{item.ISBN}}</div>
			<div>出版年:{{item.pubilsh}}</div>

		</view>
	</view>
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
			name: "平凡的世界",
			pubilsh: "2012",
			ISBN: "978-7-5302",
			writer: "路遥",
			search: "I247.57"
		}, {
			id: "123",
			name: "平凡的世界",
			pubilsh: "2012",
			ISBN: "978-7-5302",
			writer: "路遥",
			search: "I247.57"
		},

	])
</script>

<style scoped lang="scss">
	.root {
		.item {
			margin: 3px 1px;
			border-bottom: 1px solid black;
		}
	}
</style>