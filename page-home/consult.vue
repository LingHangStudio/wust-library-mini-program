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

				<view class="chat">
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
				<view v-if="item.id == 2" class="feedback">
					<view class="yes" @tap="submitQuestions(index)">未解决</view>
					<view class="no" @tap="submitSuccess(index)">已解决</view>
				</view>
				<view v-if="item.id == 3" class="finishback">
					<view class="finishbackWord">谢谢您的支持哦~会更努力哒！</view>
				</view>

			</view>
		</template>
	</view>

	<!-- 输入框 -->
	<view class="chatLine">
		<view :class="questionInput && showWordsModal && tipsList.length > 0 ? 'toolTips' : 'hideToolTips'">
			<view v-for="(item, index) in tipsList" :key="index" class="toolTip"
				@tap="commonSearch(tipsListNoLight[index])">
				<view v-html="item"></view>
			</view>
		</view>

		<view class="chatInput">
			<uni-easyinput v-model="questionInput" class="input" style="border:none;outline:none;text-align:center"
				type="text" confirm-type="send" placeholder="请输入咨询内容" primaryColor="#fff" :inputBorder="false"
				@confirm="searchQuestions()" @clear="showWordsModal = false"
				@input="(e: string) => handleDebounce(e)" />
			<view class="searchBtn" @tap="searchQuestions()">
				<!-- <image class="img" src="@/static/face1.png" alt=""></image> -->
				<view class="img"><uni-icons type="chatboxes" size="30" style="margin-left: 5px;"></uni-icons></view>
			</view>
		</view>
	</view>
	<view class="bgc"></view>
</template>

<script setup lang="ts">
	import { debounce } from "@/utils/operate"
	import { consultApi, getWordApi, submitFeedback } from "@/page-home/utils/consultApi"
	import { Ref, ref } from "vue"
	import type { resConsultType, requestQuestion, feedBackList } from "@/page-home/utils/types.d"
	import { es } from "element-plus/es/locale";

	// 解决app的列表渲染问题
	const showList_BugInAPP = ref(true)
	let useid : Ref<number> = ref(0)
	//常见问题列表
	const hotList = ["图书馆什么时候开放？", "如何找到我想借的书", "图书馆咨询电话是多少？"]
	//聊天列表
	const chatList = ref([
		{
			id: 0,
			content: "您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!",
		},
	]) as Ref<resConsultType[]>
	//未解决传参
	const feedbacklist = ref({
		status: 0,
		userId: 0,
		question: "",
		matched: []
	})
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
		console.log(chatList.value)
		console.log("question:", questionList.value)
		if (questionInput.value == "") {
			uni.showToast({
				title: "输入不能为空！",
				duration: 2000,
				icon: "fail",
			})
			return
		}
		if (questionInput.value == "春日诗韵") {
			chatList.value.push({
				id: 1,
				content: "春日诗韵",
			})
			chatList.value.push({
				id: 0,
				content: "科大图书精灵，智慧伴你行!",
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
			useid = res.data.userId;
			console.log(useid)
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
		console.log("chat", chatList.value)
		console.log("chatlist", chatList.value[2].questionList)
		// #ifdef APP-PLUS
		showList_BugInAPP.value = false
		// #endif
		scrollBottom()
		// #ifdef APP-PLUS
		showList_BugInAPP.value = true
		// #endif
	}



	//提交未解决
	const submitQuestions = async (serial : any) => {
		chatList.value[serial].id = 3;
		feedbacklist.value.question = chatList.value[serial - 1].content
		feedbacklist.value.userId = useid,
			feedbacklist.value.status = 0;
		if (chatList.value[serial].content !== "") {
			feedbacklist.value.matched = ["你的能力超出了小图的理解范围"]
		}
		else {
			feedbacklist.value.matched = chatList.value[serial].questionList
		}
		console.log(feedbacklist.value);
		const { userId, question, matched, status } = feedbacklist.value;
		const data : feedBackList = { userId, question, matched, status };
		const res : any = await submitFeedback(data)
		if (res) {
			chatList.value.push({
				id: 2,
				content: "亲，已反馈给图书馆"
			})
		}
	}
	//提交已解决


	const submitSuccess = async (serial : any) => {
		chatList.value[serial].id = 3;
		feedbacklist.value.question = chatList.value[serial - 1].content
		feedbacklist.value.userId = useid,
			feedbacklist.value.status = 1;
		if (chatList.value[serial].content !== "") {
			feedbacklist.value.matched = ["你的能力超出了小图的理解范围"]
		}
		else {
			feedbacklist.value.matched = chatList.value[serial].questionList
		}
		console.log(feedbacklist.value);
		const { userId, question, matched, status } = feedbacklist.value;
		const data : feedBackList = { userId, question, matched, status };
		const res : any = await submitFeedback(data)
		if (res) {
			chatList.value.push({
				id: 2,
				content: "亲，已反馈给图书馆"
			})
		}
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
		flex-wrap: wrap;


		.chatWord {
			z-index: 5 !important;
			margin: 10px 0;
			align-items: flex-start;
			flex-direction: row;

			.chat {
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
					max-width: 100%;
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

			.feedback {

				display: flex;
				justify-content: center;
				align-items: center;
				gap: 5px;
				margin-left: 150px;

				.yes {

					width: 50px;
					height: 25px;
					font-size: 10px;
					background-color: #f8f5f8;
					border-radius: 10px;
					line-height: 25px;
					text-align: center;
					margin-top: 3px;
					opacity: 0.5;
				}

				.no {

					width: 50px;
					height: 25px;
					font-size: 10px;
					// background-color: rgba(255, 255, 255, 0.8);
					background-color: #f8f5f8;
					border-radius: 10px;
					line-height: 25px;
					text-align: center;
					margin-top: 3px;
					opacity: 0.5;
				}
			}

			.finishback {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 20px;
				margin-top: 5px;
				margin-left: 50px;
				color: #666;
				font-size: 12px;
				opacity: 0.5;

			}
		}

		.chatWord:last-child {
			margin: 20px 0;
		}

		.chatQuestion {
			z-index: 5;
			flex-direction: row-reverse;

			.chat {
				display: flex;
				flex-direction: row-reverse;

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
					margin-left: 0;
					margin-right: 15px;
					background-color: #0d9fe2;
					color: #fff;

				}
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
		margin-bottom: 5px;

		.chatInput {
			z-index: 99 !important; // 这个页面最高层级
			width: 90vw;
			border: 3px solid #0d9fe2;
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 8px;
			height: 40px;

			input {
				flex: 1;
				height: 90%;
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
				cursor: pointer;


				.img {

					border-left: 2px solid #eee;
					margin-top: 5px;
					width: 40px;
					height: 30px;
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
		background-color: #fff;
	}
</style>