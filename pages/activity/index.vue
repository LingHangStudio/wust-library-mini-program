<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
	</view>
	<view class="content">
		<view v-if="current === 0||current===2">
			<view v-for="(item,index) in showList" :key="index" class="">
				<uni-card margin="3px" padding="3px" :is-full="true">
					<view class="box">
						<view style="border: 1px solid red;margin: 3px;" class="">
							<img style=" display: block;border: 1px solid blue;width: 40px;height: 40px;"
								src="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" alt="">
						</view>
						<!-- <view class="line">
					</view> -->
						<view class="font">
							<view class="">
								{{item.title}}
							</view>
							<view class="">
								{{item.createdAt}}
							</view>
						</view>
						<view class="">
							<uni-tag :text="item.tag" type="primary" circle></uni-tag>
						</view>
					</view>
				</uni-card>
			</view>
		</view>
		<view v-if="current === 1">
			<view v-html="lectureArticle.content"></view>
		</view>
		<view v-if="current === 3">
			<view v-html="readArticle.content"></view>
			<view v-for="(item,index) in readList" class="">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { getArticleList, getArticleContent } from "@/api/api.js"
	const items = ref(["全部", "讲座", "培训", "阅读活动"])
	const readList = ref([])
	const readArticle = ref("")
	const lectureList = ref([])
	const lectureArticle = ref("")
	const trainList = ref([])
	const current = ref(0)
	const all = ref([])
	const showList = ref([])
	const onClickItem = (e) => {
		if (current.value != e.currentIndex) {
			current.value = e.currentIndex
			if (e.currentIndex == 0) {
				showList.value = all.value
			} else if (e.currentIndex == 2) {
				showList.value = trainList.value
			}
		}


	}


	async function getArticle() {
		//讲座活动列表
		const res1 = await getArticleList({
			categoryId: 39
		})

		lectureList.value = res1.data;

		const res2 = await getArticleContent({
			id: "52"
		})
		// console.log("阅读活动文章", res);
		lectureArticle.value = res2.data

		//培训活动列表
		const res3 = await getArticleList({
			categoryId: 37,
		});
		console.log("培训列表", res3);
		trainList.value = res3.data;
		// all.value.push.apply(res3.data)
		Array.prototype.push.apply(all.value, res3.data);

		//阅读活动:文章
		// const res3 = await getArticleList({
		// 	categoryId: 23
		// })
		// console.log("阅读活动", res3);
		// readList.value = res3.data;

		const res4 = await getArticleContent({
			id: "22"
		})
		// console.log("阅读活动文章", res);
		readArticle.value = res4.data


		const test = await getArticleList({
			categoryId: 40
		})
		// all.value.push.apply(test.data)
		Array.prototype.push.apply(all.value, test.data);
		showList.value = all.value
	}
	getArticle()
</script>

<style scoped lang="scss">
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