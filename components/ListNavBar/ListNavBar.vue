<template>
	<uni-nav-bar :fixed="false" v-if="title&&showBar" :title="title" statusBar shadow :color="color"
		:backgroundColor="backgroundColor" :dark="false" />
	<view @tap="goBack" class="backBtn">
		<uni-icons type="back" color="#fff" size="27"></uni-icons>
	</view>
</template>

<script setup lang="ts">
	import { goBack } from "@/utils/operate"
	import { ref, onMounted } from "vue"
	defineProps({
		title: {
			type: String,
			default: ""
		},
		color: {
			type: String,
			default: "#fff"
		},
		backgroundColor: {
			type: String,
			default: "#142d88"
		},
	})

	const showBar = ref(true)

	const getSystemInfo = () => {
		uni.getSystemInfo().then(res => {
			if (res.deviceModel === 'Windows') showBar.value = false
		}).catch(err => {
			console.log(err)
		})
	}

	const btnToTop = ref('24px')

	onMounted(() => {
		getSystemInfo()
		// 获取导航栏高度
		btnToTop.value = uni.getMenuButtonBoundingClientRect().top + 'px'
	})
</script>

<style scoped lang="scss">
	// 悬浮的返回按钮
	.backBtn {
		width: 27px;
		height: 27px;
		z-index: 100;
		padding: 3px;
		position: fixed;
		top: v-bind(btnToTop);
		left: 5px;
		border-radius: 50%;
		color: #fff;
		// background-color: rgba(20, 45, 136, 0.8);
		background-color: $theme-color;
	}
</style>