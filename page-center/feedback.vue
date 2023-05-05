<template>
	<uni-card title="对本馆的评价">
		<uni-rate v-model="score" @change="onChange" />
		<textarea :value="feedBack" placeholder="asd" maxlength="100" style="border:1px solid lightgray" />
		<button form-type="submit">Submit</button>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const score = ref()
	const feedBack = ref("")
	const onChange = (e) => {
		score.value = e.value
	}
</script>

<style scoped lang="ts">
</style>