<template>
	<!-- 聊天框 -->
	<view id="chatBody" class="chatBox">
		<!-- 咨询页 -->
		<view class="helloTitle">
			<view class="hello">Hi,你好</view>
			<view class="word">有问题咨询小图？</view>
		</view>
		<!-- 常见问题 -->
		<view class="hot">
			<view class="title">常见问题</view>
			<view class="hotBox">
				<view v-for="(item, index) in hotList" :key="index" class="item" @tap="commonSearch(item)">
					{{ item }}
				</view>
			</view>
		</view>
		<template v-if="showList_BugInAPP">
			<view v-for="(item, index) in chatList" :key="index" class="chatWord" :class="{chatQuestion:item.id == 1}">
				<view class="icon">
					<image class="image" src="@/static/face1.png" mode=""></image>
				</view>
				<view v-if="!item.questionList" class="wordBox" v-html="item.content"> </view>
				<view v-if="item.id == 2" class="judge"></view>
				<view v-if="item?.questionList" class="questionList">
					<view class="tips">小图为您找到了以下问题~点击查看详情</view>
					<view v-for="ele in item?.questionList" :key="ele.id" class="questionItem"
						@tap="seeQuestionDetail(ele)">
						{{ ele.question }}
					</view>
				</view>
			</view>
		</template>
	</view>
	<!-- 输入框 -->
	<view class="chatLine">
		<view :class="questionInput && showWordsModal && tipsList.length > 0 ? 'toolTips' : 'hideToolTips'">
			<view v-for="(item, index) in tipsList" :key="index" class="toolTip"
				@tap="commonSearch(tipsListNoLight[index])">
				<view class="" v-html="item"></view>
			</view>
		</view>
		<view class="chatInput">
			<uni-easyinput v-model="questionInput" class="input" type="text" confirm-type="send" placeholder="请输入咨询内容"
				@confirm="searchQuestions()" @clear="showWordsModal = false"
				@input="(e: string) => handleDebounce(e)" />
			<view class="searchBtn" @tap="searchQuestions()">
				<image class="img" src="@/static/face1.png" alt=""></image>
			</view>
		</view>
	</view>
	<view class="bgc"></view>
</template>

<script setup lang="ts">
	import { debounce } from "@/utils/operate"
	import { consultApi, getWordApi } from "@/page-home/utils/consultApi"
	import { Ref, ref } from "vue"
	import type { resConsultType, requestQuestion } from "@/page-home/utils/types.d"

	// 解决app的列表渲染问题
	const showList_BugInAPP = ref(true)

	//常见问题列表
	const hotList = ["图书馆什么时候开放？", "如何找到我想借的书", "图书馆咨询电话是多少？"]
	//聊天列表
	const chatList = ref([
		{
			id: 0,
			content: "您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!",
		},
	]) as Ref<resConsultType[]>
	//搜索内容
	const questionInput = ref("")
	// 结果列表
	let questionList = ref([])

	const scrollTop = ref(0) // 内容底部与顶部的距离
	//滚动到底部
	const scrollBottom = () => {
		uni
			.createSelectorQuery()
			.select("#chatBody")
			.boundingClientRect((rect : any) => {
				var timer = setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: rect.height,
						duration: 300, // 滑动速度
					})
					scrollTop.value = rect.height - scrollTop.value
					clearTimeout(timer)
				}, 0)
			})
			.exec()
	}

	//搜索问题
	const searchQuestions = async () => {
		if (questionInput.value == "") {
			uni.showToast({
				title: "输入不能为空！",
				duration: 2000,
				icon: "fail",
			})
			return
		}
		chatList.value.push({
			id: 1,
			content: questionInput.value,
		})
		let data = {
			msg: questionInput.value,
			userId: "",
		} as requestQuestion
		showWordsModal.value = false
		const res : any = await consultApi(data)
		if (res) {
			questionList.value = res.data.matched
			questionInput.value = ""
			if (questionList.value.length !== 0) {
				chatList.value.push({
					id: 2,
					content: "",
					questionList: questionList.value,
				})
			} else {
				chatList.value.push({
					id: 2,
					content: "您的问题超出了小图的理解能力喔 ~ ",
				})
			}
		} else {
			chatList.value.push({
				id: 2,
				content: "您的问题超出了小图的理解能力喔 ~ ",
			})
		}
		// #ifdef APP-PLUS
		showList_BugInAPP.value = false
		// #endif
		scrollBottom()
		// #ifdef APP-PLUS
		showList_BugInAPP.value = true
		// #endif
	}

	// 常见问题，问题列表的搜索
	const commonSearch = (item : string) => {
		questionInput.value = item
		searchQuestions()
	}

	// 根据关键词，匹配的推荐问题列表
	// 带高亮/不带高亮两种
	const tipsList = ref([])
	const tipsListNoLight = ref([])

	// 是否显示搜索词条列表
	const showWordsModal = ref(false)

	// 输入框发生变化时: 代码高亮
	const changeInput = async (e : string) => {
		// 正则匹配
		let reg : any
		e ? (reg = new RegExp(e, "gi")) : (tipsList.value = [])

		const res = await getWordApi(e)
		if (res && e) {
			tipsListNoLight.value = res.data
			tipsList.value = res.data.map((item : string) => {
				return item.replace(reg, (key) => `<span style='background: #ffb7b7;'>${key}</span>`)
			})
			showWordsModal.value = true
		}
	}

	const handleDebounce = debounce(changeInput, 700)

	//查看问题详情
	const seeQuestionDetail = (ele : any) => {
		chatList.value.push({
			id: 2,
			content: ele.answer,
		})
		scrollBottom()
	}
</script>

<style scoped lang="scss">
	.chatBox {
		flex: 1;
		margin-bottom: 10px;
		padding: 15px 15px 40px 15px;
		display: flex;
		flex-direction: column;
		user-select: text;
		overflow-y: auto;

		.chatWord {
			z-index: 5 !important;
			margin: 10px 0;
			display: flex;
			align-items: flex-start;

			.icon {
				width: 40px;
				height: 40px;
				background-color: pink;
				border-radius: 25px;
				background-position: center;

				.image {
					width: 40px;
					height: 40px;
				}
			}

			.wordBox {
				max-width: 70%;
				margin-left: 15px;
				padding: 15px;
				background-color: #f8f5f8;
				color: #666;
				font-size: 14px;
				letter-spacing: 1px;
				border-radius: 10px;
				word-wrap: break-word;

				em {
					color: #000;
				}
			}

			.questionList {
				max-width: 70%;
				margin-left: 15px;
				padding: 15px;
				background-color: #f8f5f8;
				color: #666;
				font-size: 14px;
				letter-spacing: 1px;
				border-radius: 10px;
				word-wrap: break-word;

				.tips {
					color: #151515;
					font-weight: bold;
				}

				.questionItem {
					color: #142d88;
					cursor: pointer;
				}
			}
		}

		.chatWord:last-child {
			margin: 20px 0;
		}

		.chatQuestion {
			z-index: 5;
			flex-direction: row-reverse;

			.wordBox {
				margin-left: 0;
				margin-right: 15px;
				background-color: #142d88;
				color: #fff;
			}
		}

		.helloTitle {
			z-index: 10;
			font-weight: bold;

			.hello {
				font-size: 34px;
				color: #142d88;
			}

			.word {
				font-size: 20px;
				margin-top: 5px;
			}
		}

		.hot {
			z-index: 10;
			margin-top: 15px;
			margin-left: 10px;

			.title {
				font-weight: bold;
				color: #142d88;
			}

			.hotBox {
				margin-top: 10px;
				display: flex;
				flex-wrap: wrap;

				.item {
					padding: 10px;
					background-color: #f8f5f8;
					color: #666;
					font-size: 14px;
					margin-right: 5px;
					margin-bottom: 8px;
					border-radius: 20px;
					cursor: pointer;
				}
			}
		}
	}

	.chatBox:last-child {
		margin: 20px 0 40px 0;
	}

	//输入框
	.chatLine {
		z-index: 10;
		width: 100vw;
		height: auto;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 1px;
		border-radius: 8px;

		.chatInput {
			z-index: 99 !important; // 这个页面最高层级
			width: 98vw;
			border: 3px solid #142d88;
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 8px;

			input {
				flex: 1;
				height: 100%;
				padding: 0 15px;
				border-radius: 8px;
				font-size: 16px;
				color: #666;
				caret-color: #000;
			}

			.searchBtn {
				height: 100%;
				background-position: center;
				background-repeat: no-repeat;
				border-left: 2px solid #eee;
				cursor: pointer;

				.img {
					width: 40px;
					height: 40px;
				}
			}
		}

		.toolTips {
			z-index: 11;
			overflow: auto;
			max-height: 20vh;
			height: auto;
			font-size: 14px;
			padding: 10px 0 0 0;
			background-color: rgba(255, 255, 255, 0.8);
			width: 98vw;
			border-radius: 8px 8px 0 0;
			transform-origin: center bottom;
			transform: scaleY(1);
			transition: 0.5s;

			.toolTip {
				line-height: 1.6rem;
				padding: 1px 0 1px 10px;
				border-bottom: 1px solid $theme-color;

				.lightHight {
					background: #ffb7b7;
				}
			}

			.toolTip:last-child {
				border-bottom: 0;
			}
		}

		.hideToolTips {
			z-index: 1 !important;
			transform: scaleY(0);
			transform-origin: center bottom;
			width: 98vw;
			height: 0;
			transition: all 0.5s;

			.toolTip {
				opacity: 0;
			}
		}
	}

	.bgc {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		background-size: cover;
		background-repeat: repeat-y;
		background-image: url("https://pic4.zhimg.com/v2-e87a84f502665d8ee5fc8f1c8344f9a3_r.jpg?source=1940ef5c");
	}
</style>