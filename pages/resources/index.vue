<template>
	<uni-notice-bar show-icon text="最新消息!" />
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view class="list">
			<view @tap="goTo(item.id)" v-for="(item,index) in showList" class="item" :key="index">
				<uni-card margin="3px" padding="3px" :is-full="true">
					<view class="box">
						<view style="border: 1px solid red;margin: 3px;" class="">
							<img style=" display: block;border: 1px solid blue;width: 40px;height: 40px;"
								src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
						</view>
						<view class="font">
							<view class="">
								{{item.title}}
							</view>
							<view class="">
								<uni-icons type="eye"></uni-icons>{{item.browse}}
							</view>
						</view>
					</view>
				</uni-card>

			</view>
		</view>

	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from "vue"
	import { getArticleList, getArticleContent } from "@/api/api.js"
	import { closeDialog } from "vant";
	const items = ref(['最新资源', "最新消息"])
	const current = ref(0)
	const noticeList = ref([])
	const showList = ref([])
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
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			showList.value = e.currentIndex == 0 ? reourseList.value : noticeList.value
		}

	}
	async function getArticle() {
		//获取新闻，公告列表
		const res1 = await getArticleList({
			categoryId: 30
		})

		noticeList.value = res1.data

		//获取最新资源列表
		const res2 = await getArticleList({
			categoryId: 46,
		});
		console.log(res2)
		reourseList.value = res2.data
		showList.value = res2.data
	}

	async function getDetials(id) {

		const res = await getArticleContent({ id: id })

	}
	const goTo = (id) => {
		uni.navigateTo({
			url: "/page-service/inner?id=" + id
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

	.box {
		display: flex;

		.line {
			// display: inline-block;
			width: 3px;
			height: 1rem;
			margin: 0 3px;
			background-color: firebrick;
		}

		.font {
			// overflow: hidden;
			// flex-wrap: nowrap;
			// display: inline-block;
			// word-break: keep-all;
			// white-space: nowrap;
			margin: auto 0;
			font-size: 1rem;
			line-height: 1rem;
		}
	}
</style>