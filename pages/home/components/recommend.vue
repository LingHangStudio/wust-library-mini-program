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
		<!-- 如果有数据展示 -->
		<view v-else class="recommendCard">
			<scroll-view :scroll-top="myScroll" scroll-y :lower-threshold="30" style="height: 100vh" enable-back-to-top
				enhanced bounces @scroll="isShowArrow" @scrolltolower="getMoreFunc">
				<view v-for="(item, index) in recommendList" :key="index" class="recommendContent"
					@tap="goToInner(item.bibId)">
					<!-- 推荐书籍图片，但是接口没有给所以只能用固定图片 -->
					<view class="recommendPhoto">
						<image src="../../../static/book.png" alt="error" class="photo"></image>
					</view>
					<!-- 推荐书籍右部介绍 -->
					<view class="bookContent">
						<view class="bookTitle">{{ item.title }}</view>
						<view class="bookAuthor">{{ item.author }} / {{item.pub_year}} / {{item.publisher}}</view>
						<view class="bookISBN">ISBN号：{{item.isbn}}</view>
					</view>
				</view>
				<view style="text-align: center; padding: 3px">--到底啦！共{{ recommendList.length }}条--</view>
			</scroll-view>
		</view>
	</uni-card>
	<uni-fab v-show="topArrow" icon="top" horizontal="right" vertical="bottom" button-color="" background-color=""
		:pop-menu="false" @fab-click="toTop" />
</template>

<script setup lang="ts">
	import { hotApi } from "@/api/huiwen/home"
	import { nextTick, onMounted, ref, Ref } from "vue"
	const loadingSkeleton = ref(true)
	const recommendList : Ref<any[]> = ref([])
	let bookCount = ref(10)
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
	//获取推荐书籍信息
	const getRecommend = async (total : number) => {
		const res = await hotApi(total)
		res && (recommendList.value = res.data as any[])
		// 无论请求成功与否，都关闭骨架屏
		loadingSkeleton.value = false
	}
	const getMoreFunc = () => {
		bookCount.value += 10;
		getRecommend(bookCount.value)
		setTimeout(() => {
			//结束下拉刷新
			uni.stopPullDownRefresh();
		}, 1000);
	}

	// 推荐的书目，进入书籍详情
	const goToInner = (bibId : string) => {
		uni.navigateTo({
			url: "/page-home/detail?bibId=" + bibId,
		})
	}


	onMounted(() => getRecommend(10))
</script>

<style scoped lang="scss">
	.recommendTitle {
		padding: 10px;
		font-size: 15px;
		font-weight: 600;
	}

	.recommendCard {
		display: flex;
		flex-direction: column;

		.recommendContent {
			display: flex;
			flex-direction: row;
			height: 150px;
			padding: 5px 15px 15px 15px;

			.recommendPhoto {
				padding: 0 5px 0 0;

				.photo {
					width: 100px;
					height: 150px;
				}
			}

			.bookContent {
				display: flex;
				flex-direction: column;
				padding: 0 10px 0 10px;
				width: 150px;

				.bookTitle {
					padding: 10px 0 0 0;
					font-size: 16px;
					color: #339ed9;
					font-weight: 550;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.bookAuthor,
				.bookISBN {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					display: -moz-box;
					-moz-line-clamp: 2;
					-moz-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
					white-space: normal;
					font-size: 12px;
				}

				.bookAuthor {
					height: 36px;
					padding: 10px 0;
					color: black;
				}

				.bookISBN {
					color: gray;
				}
			}
		}
	}
</style>