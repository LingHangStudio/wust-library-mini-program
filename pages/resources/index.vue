<template>
	<uni-notice-bar show-icon text="最新消息!" />
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view class="list" v-if="current === 0">
			<view @tap="goTo(item.id)" v-for="(item,index) in reourseList" class="item" :key="index">
				<uni-card :is-full="true">
					<view class="line">
					</view>
					<view class="font">
						{{item.title}}
					</view>

				</uni-card>
				<!-- <view class="body">
					<view class="line">
					</view>
					{{item.title}}
					{{item.createdAt}}
				</view> -->
			</view>
		</view>
		<view class="list" v-if="current === 1">
			<view @tap="goTo(item.id)" v-for="(item,index) in noticeList" class="item" :key="index">
				<!-- <view class="head">
					{{item.createdAt.split("T")[0].split("-")[0]}}
				</view> -->
				<uni-card :is-full="true">
					<view class="line">
					</view>
					{{item.title}}
				</uni-card>
				<!-- <view class="body">
					{{item.createdAt.split("T")[0].split("-")[1]}}-{{item.createdAt.split("T")[0].split("-")[2]}}
					<view class="line">
					</view>
					{{item.title}}
					{{item.createdAt}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from "vue"
	import { getArticleList, getArticleContent } from "@/api/api.js"
	const items = ref(['最新资源', "最新消息"])
	const current = ref(0)
	const noticeList = ref([])
	const reourseList = ref([])
	const year = ref(0)

	// const showHead = (createdAt) => {
	// 	let time = createdAt.split('T')[0].split('-')[0]
	// 	console.log("------");
	// 	console.log(time);
	// 	console.log(year.value);
	// 	if (year.value != time) {
	// 		year.value = time
	// 		console.log('!=');
	// 		return true
	// 	} else {
	// 		console.log("==");
	// 		return false
	// 	}
	// }
	const onClickItem = (e) => {
		if (current.value != e.currentIndex)
			current.value = e.currentIndex
	}
	async function getArticle() {
		//获取通知公告列表
		const res1 = await getArticleList({
			categoryId: 30
		})

		noticeList.value = res1.data;

		//获取最新资源列表
		const res2 = await getArticleList({
			categoryId: 46,
		});
		console.log(res2);
		reourseList.value = res2.data;
	}

	async function getDetials(id) {

		const res = await getArticleContent({ id: id })

	}
	const goTo = (id) => {
		uni.navigateTo({
			url: "/pages/service/inner?id=" + id
		})
	}
	onMounted(() => {
		getArticle()
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

	.line {
		display: inline-block;
		width: 3px;
		height: 1rem;
		margin: 0 3px;
		background-color: firebrick;
	}

	.font {
		// overflow: hidden;
		// flex-wrap: nowrap;
		display: inline-block;
		// word-break: keep-all;
		// white-space: nowrap;
		font-size: 1rem;
		line-height: 1rem;
	}
</style>