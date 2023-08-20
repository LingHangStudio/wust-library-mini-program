<template>
	<uni-card :title="baseInfo?.title" is-shadow>
		<view class="box-head">
			<view class="title">
				{{baseInfo?.title}}
			</view>
			<view v-for="(val,key,index) in detailInfo" :key="index" class="info">
				<div class="tr">
					<div class="left-style">{{key}}</div>:
					<div class="right-style"><span v-html="val" class=""></span></div>
				</div>

			</view>
		</view>
	</uni-card>

	<!-- <uni-table>
		<uni-tr>
			<uni-th align="center">索书号</uni-th>
			<uni-th align="center">年卷期</uni-th>
			<uni-th align="center">所属馆藏</uni-th>
			<uni-th align="center">书刊状态</uni-th>
		</uni-tr>
		<uni-tr>
			<uni-td>2020-10-20</uni-td>
			<uni-td>2020-10-20</uni-td>
			<uni-td>Jeson</uni-td>
			<uni-td>北京市海淀区</uni-td>
		</uni-tr>


	</uni-table> -->


	<uni-card title="书目简介" v-if="otherInfo.content" is-shadow>
		<!-- <template v-slot:title>
			<view class="" style="display: flex;justify-content: space-between;">
				<view class="">
					书目简介
				</view>
				<view class="">
					展开
				</view>
			</view>
		</template> -->
		<view v-html="otherInfo.content" class="box-content">
		</view>
	</uni-card>
	<uni-card v-if="otherInfo.authorInfo" title="作者" is-shadow>
		<view v-html="otherInfo.authorInfo" class="box-author">
		</view>
	</uni-card>

	<canvas canvas-id="lineCanvas" disable-scroll="true" class="canvas"></canvas>

	<uni-card title="目录" v-if="otherInfo.catalog" class="目录" is-shadow>
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
	import { deatileApi, deatileExtApi, deatileTrendApi, deatileHoldingApi } from "@/api/huiwen/home.js"
	import { onLoad } from "@dcloudio/uni-app"
	// import wxCharts from "./components/wxcharts-min.js"
	// infos接口的内容
	const baseInfo = ref({})
	const detailInfo = ref({})
	const extraInfo = ref({})
	// info接口下的内容
	const otherInfo = ref({}) //
	// 馆藏分布内容
	const holdingInfo = ref([])
	// trend 接口，趋势图
	const trendChart = ref([])
	const getDetails = async (bibId) => {
		const res = await deatileApi(bibId)
		if (res) {
			let info = res.data.map
			baseInfo.value = info.baseInfo.map
			detailInfo.value = info.detailInfo.map
			extraInfo.value = info.extraInfo.map
			// info.value=res.
		}

		// 获取馆藏分布
		const resHold = await deatileHoldingApi(bibId);
		if (resHold) {
			console.log("hold", resHold)
			console.log("hold")
			holdingInfo.value = resHold.holdings
		}


		// 通过baseInfo里的isbn，获取其他信息
		const resExt = await deatileExtApi(baseInfo.value.isbn)
		if (resExt) {
			otherInfo.value = resExt.data
		}


		// 获取趋势图
		// const trendArr = await deatileTrendApi(bibId)
		// if (trendArr) {
		// 	trendChart.value = trendArr.data
		// 	console.log("key", trendChart.value.keys())
		// 	console.log("value", trendChart.value.values())
		// 	//lineCanvas
		// 	new wxCharts({
		// 		canvasId: 'lineCanvas',
		// 		type: 'line',
		// 		categories: trendChart.value.keys(),
		// 		animation: true,
		// 		background: '#f5f5f5',
		// 		series: [{
		// 			name: '借阅量',
		// 			data: trendChart.value.values(),
		// 		}],
		// 		xAxis: {
		// 			disableGrid: true
		// 		},
		// 		yAxis: {
		// 			title: '借阅量',
		// 			min: 0
		// 		},
		// 		// width: (375),
		// 		// height: (200 * windowW),
		// 		dataLabel: false,
		// 		dataPointShape: true,
		// 		extra: {
		// 			lineStyle: 'curve'
		// 		}
		// 	});
		// }
	}
	onLoad((e) => {
		console.log(e)
		if (e) {
			getDetails(e.bibId)
		}

	})
</script>

<style scoped lang="scss">
	.tr {
		display: flex;
	}

	.left-style {
		width: 30%;
		/* justify-content: flex-end; */
		/* float: right; */
		text-align: right;
	}

	.right-style {
		text-align: left;
		width: 70%;
	}

	.canvas {
		width: 750rpx;
		height: 500rpx;
	}
</style>