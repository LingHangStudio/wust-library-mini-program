<template>
	<ListSkeleton v-if="loadingSkeleton" :rows="4"> </ListSkeleton>
	<uni-card v-else margin="10px 8px 5px 8px" spacing="0px" padding="0px">
		<uni-section title="为您推荐" type="line" type-color="#142d88">
			<template #right>
				<uni-icons type="refresh" size="24" color="#142d88" @click="changeBatch"></uni-icons>
			</template>
			<view v-if="recommendList.length === 0" class="">
				<Empty width="160px" height="120px"></Empty>
			</view>
			<view v-else class="list">
				<view v-for="item in recommendList.slice(8 * recommendIndex, 8 + 8 * recommendIndex)" :key="item.rank"
					class="item" @tap="goToInner(item.bibId)">
					<!-- <uni-card :border="false" shadow="0px 0px 0px 0px #fff" :is-shadow="false" padding="0px"
						margin="0px" :is-full="true"> -->
					<span class="order" :style="{ backgroundColor: setColor(item.rank) }">{{ item.rank }}</span>
					<span class="title">{{ item.title }}</span>
					<!-- </uni-card> -->
				</view>
			</view>
		</uni-section>
	</uni-card>
</template>

<script setup lang="ts">
	import { hotApi } from "@/api/huiwen/home"
	import { onMounted, ref, Ref } from "vue"
	const loadingSkeleton = ref(true)
	const recommendList : Ref<any[]> = ref([])

	const getRecommend = async () => {
		const res = await hotApi(16)
		res && (recommendList.value = res.data as any[])
		// 无论请求成功与否，都关闭骨架屏
		loadingSkeleton.value = false
	}

	const setColor = (order : number) => {
		const colorMap = {
			1: "#ffbb3b",
			2: "#d9dae3",
			3: "#ff9d6a",
		};
		return colorMap[order] || "";
	}

	// 推荐的书目，进入书籍详情
	const goToInner = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId,
		})
	}

	const recommendIndex = ref(0)
	// 换一换：改变展示的列表
	const changeBatch = () => {
		recommendIndex.value = (recommendIndex.value + 1) % 2
	}

	onMounted(() => {
		getRecommend()
	})
</script>

<style scoped lang="scss">
	.list {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.item {
			// padding-left: 10px;
			height: 35px;
			border: none;
			width: 45%;
			align-items: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
		}
	}

	.title {
		width: 100%;
		font-size: 1rem;
		// margin: 2px;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	.order {
		display: inline-block;
		border-radius: 50%;
		// padding: 10px;
		width: 25px;
		align-items: center;
		text-align: center;
		height: 25px;
		// line-height: 12.5px;
	}
</style>