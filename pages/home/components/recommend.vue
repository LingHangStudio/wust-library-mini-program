<template>
	<!-- 等待时候展示的样式骨架屏（一个个灰色横杠） -->
	<ListSkeleton v-if="loadingSkeleton" :rows="4"></ListSkeleton>
	<!-- 推荐卡片 -->
	<uni-card v-else margin="10px 8px 5px 8px" spacing="0px" padding="0px">
		<!-- 标题 -->
		<view class="recommendTitle">好书推荐</view>
		<!-- 内容 -->
		<!-- 如果没有数据展示Empty组件 -->
		<template v-if="recommendList.length === 0">
			<Empty width="160px" height="120px"></Empty>
		</template>
		<!-- 如果有数据展示图片 -->
		<view v-else class="recommendCard">
			<view v-for="(item, index) in recommendList" :key="index" class="recommendContent"
				@tap="goToInner(item.bibId)">
				<view>
					<image :src="item.url" alt="error"></image>
				</view>
				<view>{{ item.name }}</view>
			</view>
		</view>



		<!-- <template #right>
			<view v-show="recommendList.length !== 0" hover-class="rotate-2d">
				<uni-icons type="refresh" size="24" color="#22b3f6" @click="changeBatch"></uni-icons>
			</view>
		</template>
		<uni-transition mode-class="fade" :show="recommendStatus.show">
			<template v-if="recommendList.length === 0">
				<Empty width="160px" height="120px"></Empty>
			</template>
			<view v-else class="list">
				<view v-for="item in recommendList.slice(8 * recommendStatus.index, 8 + 8 * recommendStatus.index)"
					:key="item.rank" class="item" @tap="goToInner(item.bibId)">
					<span class="order" :style="{ backgroundColor: setColor(item.rank) }">{{ item.rank }}</span>
					<span class="title">{{ item.title }}</span>
				</view>
			</view>
		</uni-transition> -->
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
		return colorMap[order] ?? "";
	}

	// 推荐的书目，进入书籍详情
	const goToInner = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId,
		})
	}

	const recommendStatus = ref({
		index: 0,
		show: true
	})

	// 换一换：改变展示的列表
	const changeBatch = () => {
		recommendStatus.value.show = false;
		setTimeout(() => {
			recommendStatus.value = {
				index: (recommendStatus.value.index + 1) % 2,
				show: true
			}
		}, 300)
	}

	onMounted(() => getRecommend())
</script>

<style scoped lang="scss">
	.recommendTitle {
		padding: 10px;
		font-size: 15px;
		font-weight: 600;
	}

	.recommendContent {
		display: flex;
		flex-direction: column;
	}

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