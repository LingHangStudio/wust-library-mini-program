<template>
	<view class="background">
		<image src="@/static/library.png" mode=""></image>
	</view>
	<view class="form">
		<uni-easyinput class="input" v-model="userForm.username" :inputBorder="false" maxlength="13"
			prefixIcon="person-filled" type="text" placeholder="请输入学号" />
		<uni-easyinput class="input" v-model="userForm.password" :inputBorder="false" prefixIcon="locked"
			type="password" placeholder="请输入密码" />
		<view @tap="" class="forget">
			忘记密码?
		</view>
		<view class="button">
			<button type="primary" @tap="login">提交</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const userForm = ref({
		username: "as",
		password: "dasd"
	})
	const style = {
		"background-color": "#e9e9e9",
		"borderColor": '#2979FF'
	}
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
		width: 100%;
		// margin-bottom: 5px;

		uni-image {
			width: 99%;
		}
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

		.button {}
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