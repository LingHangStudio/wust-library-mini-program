<template>
	<uni-card>
		<view class="box-head">
			<view class="title">
				{{baseInfo?.title}}
			</view>
			<view v-for="(val,key,index) in detailInfo" :key="index" class="info">
				{{key}}:<span v-html="val" class=""></span>
			</view>
		</view>
	</uni-card>
	<uni-card v-if="otherInfo.content" title="书目简介">
		<view v-html="otherInfo.content" class="box-content">
		</view>
	</uni-card>
	<uni-card v-if="otherInfo.authorInfo" title="作者">
		<view v-html="otherInfo.authorInfo" class="box-author">
		</view>
	</uni-card>
	<uni-card v-if="otherInfo.catalog" class="目录">
		<view v-html="otherInfo.catalog" class="box-catalog">
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	// 书籍详情的接口：
	// infos 获取baseInfo，放在顶部
	// info 获取详细信息，放在下面：章节信息，作者简介，书目简介，封面
	// trend 获取图表
	// holdings 获取馆藏信息

	import { ref } from "vue"
	import { deatileApi,deatileExtApi,deatileTrend } from "@/api/huiwen/home.js"
	import { onLoad } from "@dcloudio/uni-app"
	// infos接口的内容
	const baseInfo = ref({})
	const detailInfo = ref({})
	const extraInfo = ref({})
	// info接口下的内容
	const otherInfo = ref({}) //
	// trend 接口，趋势图
	const trendChart=ref([])
	const getDetails = async (bibId) => {
		const res = await deatileApi(bibId)
		if (res) {
			let info = res.data.map
			baseInfo.value = info.baseInfo.map
			detailInfo.value = info.detailInfo.map
			extraInfo.value = info.extraInfo.map
			// info.value=res.
		}
		// 通过baseInfo里的isbn，获取其他信息
		const resExt = await deatileExtApi(baseInfo.value.isbn)
		otherInfo.value = resExt.data
		
		// 获取趋势图
		// const trendArr=await deatileTrend(bibId)
		// trendChart.value=trendArr.data
	}
	onLoad((e) => {
		console.log(e)
		if (e) {
			getDetails(e.bibId)
		}

	})
</script>

<style scoped lang="scss">

</style>