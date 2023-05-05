<template>
	<uni-card padding="5px" margin="0px">
		<!-- 咨询页 -->
		<view class="helloTitle">
			<view class="hello">Hi,你好</view>
			<view class="word">有问题咨询小图？</view>
		</view>
		<!-- 常见问题 -->
		<view class="hot">
			<view class="title">常见问题</view>
			<view class="hotBox">
				<view class="item" v-for="(item, index) in hotList" :key="index" @click="commonSearch(item)">
					{{ item }}
				</view>
			</view>
		</view>
		<!-- 聊天框 -->
		<view class="chat">
			<view class="chatBox" id="chatBody">
				<view class="chatWord" v-for="(item, index) in chatList" :key="index"
					:class="item.id == 1 ? 'chatQuestion' : ''">
					<view class="icon"></view>
					<view class="wordBox" v-if="!item.questionList">
						{{ item.content }}
					</view>
					<view class="judge" v-if="item.id == 2"></view>
					<view class="questionList" v-if="item.questionList">
						<view class="tips">小图为您找到了以下问题~点击查看详情</view>
						<view class="questionItem" v-for="ele in item.questionList" :key="ele.id"
							@click="seeQuestionDetail(ele)">
							{{ ele.question }}
						</view>
					</view>
				</view>
			</view>
			<view class="chatLine">
				<uni-easyinput placeholder="请输入咨询内容" v-model="questionInput" @keyup.enter="searchQuestions()" />
				<view class="searchBtn" @click="searchQuestions()">
					<img class="img" src="../static/face1.png" alt="">
				</view>
			</view>
		</view>

	</uni-card>
</template>

<script setup lang="ts">
	import { searchQuestion } from "@/api/consult.js"
	import { ref, reactive } from "vue"
	//常见问题列表
	const hotList = reactive([
		"图书馆什么时候开放？",
		"如何找到我想借的书",
		"图书馆咨询电话是多少？",
		"为什么要求读者登记Email或手机号码？",
	])
	//聊天列表
	const chatList = reactive([
		{
			id: 0,
			content:
				"您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!",
		},
	])
	//搜索内容
	const questionInput = ref("")
	// 结果列表
	let questionList = reactive([])

	//方法
	// 常见问题搜索
	const commonSearch = (item) => {
		questionInput.value = item;
		searchQuestions();
	}
	//搜索问题
	async function searchQuestions() {
		chatList.push({
			id: 1,
			content: questionInput.value,
		});
		let data = {
			msg: questionInput.value,
			userId: "",
		};
		const res = await searchQuestion(data);
		console.log(res);
		if (res) {
			questionList = res.data;
			questionInput.value = "";
		} else {
			questionInput.value = "";
			chatList.push({
				id: 2,
				content: "您的问题超出了小图的理解能力喔 ~ ",
			});
		}


		if (questionList.length == 0) {

		} else {
			// chatList.push({
			// 	id: 2,
			// 	// questionList: questionList,
			// });
		}
		this.scrollBottom();
	}
	//查看问题详情
	const seeQuestionDetail = (ele) => {
		chatList.push({
			id: 2,
			content: ele.answer,
		});
		scrollBottom();
	}
	//滚动到底部
	const scrollBottom = () => {
		let ele = document.getElementById("chatBody");
		if (ele.scrollHeight > ele.clientHeight) {
			setTimeout(function () {
				ele.scrollTop = ele.scrollHeight;
			}, 500);
		}
	}
</script>

<style scoped lang="scss">
	// .consultBox {
	// 	background-color: #fff;
	// 	position: fixed;
	// 	// border-radius: 20px;
	// 	box-shadow: 0 0 10px #00000050;
	// 	display: flex;
	// 	flex-direction: column;

	//
	.helloTitle {
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
		margin-top: 20px;
		margin-left: 20px;

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

	.chat {
		flex: 1;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		user-select: text;

		.chatBox {
			height: 250px;
			overflow-y: auto;
			padding: 0 15px 0 0;

			.chatWord {
				margin: 20px 0;
				display: flex;
				align-items: flex-start;

				.icon {
					width: 40px;
					height: 40px;
					background-color: pink;
					border-radius: 25px;
					background-image: url("@/static/face1.png");
					background-position: center;
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

			.chatQuestion {
				flex-direction: row-reverse;

				.icon {
					background-image: url("@/static/face2.png");
				}

				.wordBox {
					margin-left: 0;
					margin-right: 15px;
					background-color: #142d88;
					color: #fff;
				}
			}
		}

		.chatBox::-webkit-scrollbar {
			width: 6px;
			border-radius: 6px;
		}

		.chatBox::-webkit-scrollbar-thumb {
			background: #e1e1e1;
		}

		.chatBox::-webkit-scrollbar-track {
			background: none;
		}

		//输入框
		.chatLine {
			// margin-top: 10px;
			border: 3px solid #142d88;
			border-radius: 8px;
			display: flex;
			align-items: center;

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
				// width: 80px;
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
	}

	// }

	.consultAni-enter-active,
	.consultAni-leave {
		right: 130px;
		opacity: 1;
		transition: 0.5s ease-in-out;
	}

	.consultAni-enter,
	.consultAni-leave-active {
		opacity: 0;
		right: -200px;
		transition: 0.5s ease-in-out;
	}
</style>