<template>
	<uni-card :title="baseInfo?.title" margin="5px" is-shadow>
		<view class="box-head">
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

	<qiun-data-charts :ontouch="true" type="line" :chartData="trendChart" />

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
	// infos接口的内容
	const baseInfo = ref({})
	const detailInfo = ref({})
	const extraInfo = ref({})
	// info接口下的内容
	const otherInfo = ref({}) //
	// 馆藏分布内容
	const holdingInfo = ref([])
	// trend 接口，趋势图
	const trendChart = ref({})
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
		const trendArr = await deatileTrendApi(bibId)
		console.log("trend", trendArr)
		if (trendArr) {
			//lineCanvas
			trendChart.value = {
				canvas2d: true,
				categories: Object.keys(trendArr.data).splice(-6),
				enableScroll: true,
				animation: false,
				background: '#f5f5f5',
				series: [{
					name: '借阅量',
					data: Object.values(trendArr.data).splice(-6),
				}],
				xAxis: {
					type: 'grid',
					gridType: 'dash',
					itemCount: 4,//x轴单屏显示数据的数量，默认为5个
					scrollShow: true,//新增是否显示滚动条，默认false
					scrollAlign: 'left',//滚动条初始位置
					scrollBackgroundColor: '#F7F7FF',//默认为 #EFEBEF
					scrollColor: '#DEE7F7',//默认为 #A6A6A6
				},
				yAxis: {
					title: '借阅量',
					min: 0
				},
				// width: (375),
				// height: (200 * windowW),
				dataLabel: false,
				// dataPointShape: true,
				extra: {
					lineStyle: 'curve'
				}
			}
		}
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