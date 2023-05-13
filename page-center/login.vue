<template>
	<view class="background">
		<image style="width: 100vw"
			src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" mode="scaleToFill">
		</image>
	</view>
	<view class="form">
		<uni-easyinput class="input" v-model="userForm.username" :inputBorder="false" maxlength="13"
			prefixIcon="person-filled" type="number" placeholder="请输入学号/工号" />
		<uni-easyinput class="input" v-model="userForm.password" :inputBorder="false" prefixIcon="locked"
			type="password" placeholder="请输入密码" />
		<view @tap="" class="forget">
			忘记密码?
		</view>
		<view class="button">
			<button @tap="login">提交</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const userForm = ref({
		username: "202113407294",
		password: "dasd"
	})
	function login() {
		const res = 0;
		uni.setStorageSync("user", userForm.value)
		
		uni.switchTab({
			url: '/pages/home/index'
		});
	}
</script>

<style scoped lang="scss">
	.background {
		width: 100vw;
		// border: 1px solid red;
		// margin-bottom: 5px;

		uni-image {
			// border-radius: 0 0 25% 25%;
			width: 99%;
		}

		// uni-image::after {
		// 	content: 'dsd';
		// 	width: 120%;
		// 	height: 100%;
		// 	position: absolute;
		// 	// left: -10%;
		// 	top: 0;
		// 	// z-index: -1;
		// 	border-radius: 0 0 50% 50%;
		// 	background: #2ea7e0;
		// }





		// border-radius:0 0 30px 0;
	}

	.form {
		margin: 20px auto;
		width: 80vw;


		.input {
			margin: 10px 0;
		}

		.forget {
			margin: 20px 0;
			text-decoration: underline;
		}

		.button {
			button {
				// background-color: #142d88;
				color: #142d88;
			}

		}
	}

	.button {
		border-radius: 3px;

	}

	::v-deep.input .uni-easyinput__content {
		// box-shadow: 0 0 0 44rpx #e9e9e9 inset;
		// background-color: #e9e9e9;
	}

	::v-deep.input .uni-input-placeholder {
		// box-shadow: 0 0 0 44rpx #e9e9e9 inset;
		// background-color: #e9e9e9;
		font-size: 20px;
		color: #b5b4b2;

	}
</style>