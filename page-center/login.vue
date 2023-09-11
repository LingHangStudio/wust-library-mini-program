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
	import { loginAPI, login1API } from "@/api/user"
	import { loginFinalApi } from "@/api/huiwen/home"
	import { ref } from "vue"
	import RSA from "@/utils/rsa.js"
	// 创建 RSA 密钥对象，并提供模数（modulus）和指数（exponent）

	//
	const userForm = ref({
		username: "202113407294",
		password: "www.29900",
		service: "https://libsys.wust.edu.cn:443/meta-local/opac/cas/rosetta",
	})
	const login = async () => {
		const rsaTokenPublicModulus = 'b5eeb166e069920e80bebd1fea4829d3d1f3216f2aabe79b6c47a3c18dcee5fd22c2e7ac519cab59198ece036dcf289ea8201e2a0b9ded307f8fb704136eaeb670286f5ad44e691005ba9ea5af04ada5367cd724b5a26fdb5120cc95b6431604bd219c6b7d83a6f8f24b43918ea988a76f93c333aa5a20991493d4eb1117e7b1'
		const rsaTokenPublicExponent = '10001'
		// console.log('加密后的数据 ');
		const password = RSA.encryptedString(RSA.getKeyPair(rsaTokenPublicExponent, '', rsaTokenPublicModulus), userForm.value.password)
		console.log('password', password)
		try {
			const res = await loginAPI({ ...userForm.value, password })
			console.log('res', res)
			if (res) {
				const res1 = await login1API(res.data)
				console.log('res1', res1)
				if (res1) {
					console.log('info', await loginFinalApi(res1.data))
				}
			}
		} catch (e) {
			console.log(e)
			//TODO handle the exception
		}

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