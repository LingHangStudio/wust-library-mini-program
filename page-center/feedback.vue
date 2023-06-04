<template>
	<uni-card title="对本馆的评价">
		<uni-rate v-model="score" @change="onChange" />
		<textarea v-model="feedBack" placeholder="对我们有什么建议" placeholder-style="color:#F76260" maxlength="100"
			@confirm="submit" style="border:1px solid lightgray" />
		<view class="submit">
			<button form-type="submit" @tap="submit">提交</button>
		</view>

	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const score = ref()
	const feedBack = ref("")
	const onChange = (e) => {
		score.value = e.value
	}
	const submit = () => {
		if (!feedBack.value || !score.value) {
			uni.showToast({
				title: "请输入内容",
				icon: "error",
				duration: 1500
			})
		} else {
			feedBack.value = ""
			uni.showToast({
				title: "上传成功",
				duration: 1500
			})

		}
	}
</script>

<style scoped lang="scss">
	.submit {
		width: 40vw;
		margin: 10px auto 3px auto;
	}
</style>