<template>
	<view>
		<uni-segmented-control :current="current" style-type="text" active-color="#142d88" :values="items"
			@click-item="onClickItem" />
	</view>

	<ListSkeleton v-if="loading" :loop="6" :rows="2"></ListSkeleton>
	<!-- 如果没有数据展示Empty组件 -->
	<template v-if="showList.length === 0">
		<Empty width="160px" height="120px"></Empty>
	</template>
	<!-- 如果有数据展示 -->
	<view v-else>
		<scroll-view :scroll-top="myScroll" scroll-y :lower-threshold="30" style="height: 100vh" enable-back-to-top
			enhanced bounces @scroll="isShowArrow" @scrolltolower="getMoreFunc">

			<view v-for="(item, index) in showList" :key="index" class="item">
				<uni-card margin=" 7px" padding="3px">
					<view class="box">
						<view style="margin: 3px" class="">
							<img style="display: block; width: 40px; height: 40px"
								src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="" />
						</view>
						<view class="font">
							<view class="title">
								{{item.title}}
							</view>
							<view class="link" v-if="item.link.length!==0">
								<view class="linkWord">{{item.link}}</view>
								<button @click="copy(item.link)" class="linkButton" type="primary">复制</button>
							</view>
						</view>
					</view>
				</uni-card>
			</view>

			<view style="text-align: center; padding: 3px">--到底啦！共{{ showList.length }}条--</view>
		</scroll-view>
	</view>

	<!-- 返回顶部按钮 -->
	<uni-fab v-show="topArrow" icon="top" horizontal="right" vertical="bottom" button-color="" background-color=""
		:pop-menu="false" @fab-click="toTop" />
</template>

<script setup lang="ts">
	import { ref, onMounted, Ref, nextTick } from "vue"
	import { articleListApi } from "@/api/end/index"
	const loading = ref(true)
	const items = ref(["全部", "中文库", "外文库", "OA库", "自建库"])
	const showLists = ref([{ key: 1,title:"测试", link: "https://blog.csdn.net/qd_ljp/article/details/119732680" },
	{ key: 2,title:"测试",link: "https://blog.csdn.net/qd_ljp/article/details" }, { key: 3,title:"ceshi",link: "https://blog.csdn.ne99999" }])
	const showList = ref([])
	// 分栏
	const current = ref(0)
	// 置顶按钮
	const myScroll = ref(0)
	const oldScrollTop = ref(0)
	const topArrow = ref(false)

	const toTop = () => {
		myScroll.value = oldScrollTop.value
		nextTick(() => myScroll.value = -30)
		topArrow.value = false
	}
	const isShowArrow = (e : any) => {
		oldScrollTop.value = e.detail.scrollTop
		e.detail.scrollTop > 50 ? topArrow.value = true : topArrow.value = false
	}



	//获取信息
	const getArticleList = async (resourceType : number) => {
		const res = await articleListApi({ resourceType })
		if (res.code === 200) {
			showList.value = res.data.list
		}
		showList.value = showLists.value
		loading.value = false
	}

	// 选择分栏
	const onClickItem = (e : any) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			loading.value = true
			showList.value = []
			getArticleList(e.currentIndex)
			loading.value = false
		}
	}
	//复制信息
	const copy = (value : string) => {
		uni.setClipboardData({
			data: value,
		})
	}
	onMounted(() => {
		getArticleList(0)
	})
</script>

<style scoped lang="scss">
	.content {
		.list {
			.item {
				.head {
					font-size: 1.5rem;
					margin: 3px;
				}

				.body {
					display: flex;
					flex-direction: row;

					.line {
						width: 3px;
						height: 1.2rem;
						margin: 0 3px;
						background-color: firebrick;
					}
				}
			}
		}
	}

	.box {
		display: flex;
		align-items: center;
		min-height: 57px;
		width: 100%;

		.line {
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			align-items: center;
			margin-left: 2px;
			padding: 3px 0;
			width: 100%;

			.title {
				font-size: 18px;
				color: #1c1c1c;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				/*行数*/
				-webkit-box-orient: vertical;
				display: -moz-box;
				-moz-line-clamp: 2;
				-moz-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
				white-space: normal;
			}

			.link {

				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				width: 80%;

				.linkWord {
					font-size: 14px;
					color: #9a9999;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.linkButton {
					margin-left: 5px;
					padding: 0 5px 0 5px;
					display: flex;
					align-items: center;
					justify-content: center;
					height: 16px;
					font-size: 8px;
					width: 40px;
				}
			}
		}
	}

	.url {
		color: $theme-color;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	.tipBox {
		width: 100%;
		margin: 0px 15px;

		& {
			line-height: 1.5rem;
		}
	}
</style>