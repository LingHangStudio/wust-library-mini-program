<template>
	<!-- 聊天框 -->
	<view class="chatBox" id="chatBody">
		<!-- 咨询页 -->
		<view class="helloTitle">
			<view class="hello">Hi,你好</view>
			<view class="word">有问题咨询小图？</view>
		</view>
		<!-- 常见问题 -->
		<view class="hot">
			<view class="title">常见问题</view>
			<view class="hotBox">
				<view class="item" v-for="(item, index) in hotList" :key="index" @tap="commonSearch(item)">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="chatWord" v-for="(item, index) in chatList" :key="index"
			:class="item.id == 1 ? 'chatQuestion' : ''">
			<view class="icon">
				<image class="image" src="@/static/face1.png" mode=""></image>
			</view>
			<view class="wordBox" v-if="!item.questionList">
				{{ item.content }}
			</view>
			<view class="judge" v-if="item.id == 2"></view>
			<view class="questionList" v-if="item?.questionList">
				<view class="tips">小图为您找到了以下问题~点击查看详情</view>
				<view class="questionItem" v-for="ele in item?.questionList" :key="ele.id"
					@tap="seeQuestionDetail(ele)">
					{{ ele.question }}
				</view>
			</view>
		</view>
	</view>
	<view class="chatLine">
		<view :class="questionInput&&showWordsModal&&tipsList.length>0?'toolTips':'hideToolTips'">
			<view @tap="commonSearch(item)" v-for="(item,index) in tipsList" :key="index" class="toolTip">
				{{item}}
			</view>
		</view>
		<view class="chatInput">
			<uni-easyinput class="input" type="text" confirm-type="send" placeholder="请输入咨询内容" v-model="questionInput"
				@confirm="searchQuestions()" @clear="showWordsModal=false" @input="(e:string)=>handleDebounce(e)" />
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

	//常见问题列表
	const hotList = [
		"图书馆什么时候开放？",
		"如何找到我想借的书",
		"图书馆咨询电话是多少？",
	]
	//聊天列表
	const chatList : Ref<resConsultType[]> = ref([
		{
			id: 0,
			content:
				"您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!",
		},
	])
	//搜索内容
	const questionInput = ref("")
	// 结果列表
	let questionList = ref([])

	// 常见问题，问题列表的搜索
	const commonSearch = (item : string) => {
		questionInput.value = item;
		searchQuestions();
	}

	// 推荐问题列表
	const tipsList = ref([])

	// 是否显示搜索词条列表
	const showWordsModal = ref(false)

	// 输入框发生变化时
	const changeInput = async (e : string) => {
		tipsList.value = []
		const res = await getWordApi(e)
		if (res) {
			tipsList.value = res.data
			// tipsList.value = [
			// 	"assasa",
			// 	"sasasa",
			// 	"frf"
			// ]
			showWordsModal.value = true
		}
	}

	const handleDebounce = debounce(changeInput, 700)

	//搜索问题
	const searchQuestions = async () => {
		if (questionInput.value == '') {
			uni.showToast({
				title: "输入不能为空！",
				duration: 2000,
				icon: "fail"
			})
			return
		}
		chatList.value.push({
			id: 1,
			content: questionInput.value,
		});
		let data = {
			msg: questionInput.value,
			userId: "",
		} as requestQuestion;
		showWordsModal.value = false
		const res = await consultApi(data);

		if (res) {
			questionList.value = res.data.matched;
			questionInput.value = "";
			if (questionList.value.length !== 0) {
				chatList.value.push({
					id: 2,
					content: "",
					questionList: questionList.value,
				});
			} else {
				chatList.value.push({
					id: 2,
					content: "您的问题超出了小图的理解能力喔 ~ ",
				});
			}
		} else {
			chatList.value.push({
				id: 2,
				content: "您的问题超出了小图的理解能力喔 ~ ",
			});
		}
		scrollBottom();
	}
	//查看问题详情
	const seeQuestionDetail = (ele : any) => {
		chatList.value.push({
			id: 2,
			content: ele.answer,
		});
		scrollBottom();
	}
	const scrollTop = ref(0) // 内容底部与顶部的距离
	//滚动到底部
	const scrollBottom = () => {
		uni.createSelectorQuery().select("#chatBody").boundingClientRect((rect : any) => {
			var timer = setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: rect.height,
					duration: 300,// 滑动速度
				})
				scrollTop.value = rect.height - scrollTop.value
				clearTimeout(timer)
			}, 0)
		}).exec()
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
		z-index: 10;
		overflow-y: auto;

		.chatWord {
			z-index: 10;
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
			z-index: 10;
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
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		bottom: 1px;
		border-radius: 8px;

		.chatInput {
			width: 99vw;
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
			overflow: auto;
			max-height: 20vh;
			height: 20vh;
			font-size: 14px;
			padding: 10px 0 0 0;
			// margin: 0 10px;
			background-color: rgba(255, 255, 255, 0.8);
			width: 99vw;
			border-radius: 8px 8px 0 0;
			transition: height 0.5s;


			.toolTip {
				line-height: 1.5rem;
				padding: 0 0 0 10px;
				border-bottom: 1px solid $theme-color;
			}
		}

		.hideToolTips {
			overflow: hidden;
			height: 0px;
			transition: height 0.5s;

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
		background-image: url('https://pic4.zhimg.com/v2-e87a84f502665d8ee5fc8f1c8344f9a3_r.jpg?source=1940ef5c');
	}

	// .consultAni-enter-active,
	// .consultAni-leave {
	// 	right: 130px;
	// 	opacity: 1;
	// 	transition: 0.5s ease-in-out;
	// }

	// .consultAni-enter,
	// .consultAni-leave-active {
	// 	opacity: 0;
	// 	right: -200px;
	// 	transition: 0.5s ease-in-out;
	// }
</style>