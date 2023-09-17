<template>
	<!-- <view class="background">
		<image style="width: 100vw"
			src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" mode="scaleToFill">
		</image>
	</view> -->
	<view class="root">
		<view class="form-wrapper animate__animated animate__slideInRight">
			<view class="form">
				<h1
					style="color:#142d88; text-align: center; font-size: 55px;margin-bottom: 20px;font-family: cursive;">
					Login</h1>
				<uni-forms ref="myForm" :modelValue="userForm" :rules="rules">
					<uni-forms-item name="username">
						<uni-easyinput :maxlength="18" confirmType="next" type="text" prefixIcon="person-filled"
							v-model="userForm.username" placeholder="请输入学号/工号" />
					</uni-forms-item>
					<uni-forms-item name="password">
						<uni-easyinput type="password" :maxlength="32" prefixIcon="locked" v-model="userForm.password"
							placeholder="请输入密码" />
						<!-- <input class="ipt" type="password" v-model="userForm.password" placeholder="请输入密码" /> -->
					</uni-forms-item>
					<uni-forms-item name="code">
						<uni-easyinput :maxlength="4" confirmType="send" class="ipt" type="text" prefixIcon="flag"
							v-model="userForm.code" placeholder="请输入验证码" />
						<view @tap="getCode" class="code">
							<image :src="codeImg" mode="" style="width: 100px;height: 30px;"></image>
						</view>
					</uni-forms-item>
					<view class="foot">
						<view class="forget" @tap="showToolTip.open()">
							忘记密码?
						</view>

					</view>
					<button @tap="vertify" class="button">登录</button>
				</uni-forms>
			</view>
		</view>
	</view>

	<uni-popup ref="showToolTip" type="bottom" background-color="#fff">
		<view class="popup-content" v-html="toolTipContent"></view>
	</uni-popup>

	<uni-popup ref="errorMsg" type="message">
		<uni-popup-message type="error" :message="errorMsgContent" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { loginAPI, login1API } from "@/api/user"
	// import { activeCookie } from "@/api/huiwen/center"
	import { loginFinalApi, getCodeApi } from "@/api/end"
	import { ref, onMounted } from "vue"
	import { useStore } from "@/store"
	import RSA from "@/utils/rsa.js"
	import { weBtoa } from '@/utils/weapp-jwt'
	const store = useStore()
	const showToolTip = ref(null)
	const codeImg = ref('')
	const code = ref('')
	const errorMsg = ref(null)
	const errorMsgContent = ref("")

	const toolTipContent = `<h3>账号说明</h3>
		<p>1.教职工的账号为工号，学生的账号为学号。</p>
		<p>2.初始密码默认为姓名中姓的首字母大写+账号，如您修改过密码，则以修改后的密码为准。</p>
		<h3>忘记密码</h3>
		<p>用户忘记密码可通过两种方式进行密码重置：</p>
		<p>1. 用户可在登录页面点击“忘记密码”，输入正确信息找回密码。</p>
		<P>2. 用户可持有效证件（身份证、校园卡）至图书馆二楼服务台重置密码。</P>`
	const myForm = ref(null)
	const userForm = ref({
		username: "",
		password: "",
		code: "",
		service: "https://libsys.wust.edu.cn:443/meta-local/opac/cas/rosetta",
	})

	const rules = {
		username: {
			rules: [{
				required: true,
				errorMessage: '请输入学号/工号',
			},
			{
				minLength: 8,
				maxLength: 18,
				errorMessage: '长度在 {minLength} 到 {maxLength} 个字符',
			}
			]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密码'
			}]
		},
		code: {
			rules: [{
				required: true,
				errorMessage: '请输入验证码'
			}]
		},
	}

	const encrypt = (password : string) => {
		const rsaTokenPublicModulus = 'b5eeb166e069920e80bebd1fea4829d3d1f3216f2aabe79b6c47a3c18dcee5fd22c2e7ac519cab59198ece036dcf289ea8201e2a0b9ded307f8fb704136eaeb670286f5ad44e691005ba9ea5af04ada5367cd724b5a26fdb5120cc95b6431604bd219c6b7d83a6f8f24b43918ea988a76f93c333aa5a20991493d4eb1117e7b1'
		const rsaTokenPublicExponent = '10001'
		return RSA.encryptedString(RSA.getKeyPair(rsaTokenPublicExponent, '', rsaTokenPublicModulus), password)
	}


	const login = async () => {
		let password = encrypt(userForm.value.password)
		try {
			console.log(password)
			const res1 = await loginAPI({ ...userForm.value, password })
			console.log('res', res1)
			if (res1?.data.data) {
				if (res1?.data.data.code === 'NOUSER') {
					errorMsgContent.value = "账号不存在。"
				} else if (res1?.data.data.code === 'PASSERROR') {
					errorMsgContent.value = `密码错误。一共${res1?.data.data.data[0]} 已经错误${res1?.data.data.data[2]},`
				} else {
					errorMsgContent.value = "账号异常"
				}
				errorMsg.value.open()
				return
			}
			const res2 = await login1API(res1.data)
			console.log('res2', res2)
			// 第三个接口，请求自己的后台，获取到Cookie
			let myCookie = await loginFinalApi(res2.data)
			console.log('Cookie', myCookie)
			// 登录成功后的处理
			uni.setStorageSync("loginState", true);
			uni.setStorageSync("Cookie", myCookie.data.cookie.split(';')[0]);
			uni.setStorageSync("loginInfo", { username: userForm.value.username, password })
			store.setloginState(true)
			uni.navigateBack()
		} catch (e) {
			console.log(e)
			uni.showToast({
				title: "登录失败",
				icon: "error",
				duration: 2000
			})
		}
	}

	const getCode = async () => {
		const res = await getCodeApi()
		if (res) {
			codeImg.value = 'data:image/svg+xml;base64,' + weBtoa(res?.data.codeSvg);
			code.value = res.data.text
		}
	}

	onMounted(() => {
		getCode()
	})

	const vertify = () => {
		if (code.value.toLowerCase() !== userForm.value.code.toLowerCase()) {
			errorMsgContent.value = "验证码错误"
			errorMsg.value.open()
			return
		}
		myForm.value.validate((err : [], formData : any) => {
			if (!err) {
				console.log('success', formData)
				login()
			}
			console.log('error', err)
		})
	}
</script>

<style scoped lang="scss">
	// .background {
	// 	width: 100vw;
	// 	// border: 1px solid red;
	// 	// margin-bottom: 5px;

	// 	uni-image {
	// 		// border-radius: 0 0 25% 25%;
	// 		width: 99%;
	// 	}
	// 	// border-radius:0 0 30px 0;
	// }
	.root {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-image: url('https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1');
		background-attachment: fixed;
		background-size: cover;


		.form-wrapper {
			background: rgb(0 0 0 / 6%);
			backdrop-filter: blur(2px);
			height: 100%;
			box-sizing: border-box;
			display: flex;
			// justify-content: center;
			align-items: center;
		}
	}

	.form {
		background-color: rgba(255, 255, 255, 1);
		margin: 10px auto;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 1px 1px 1px 1px #888888;
		// color: #fff;
		width: 80vw;

		.input {
			margin: 10px 0;
		}

		.input:last-child {
			margin: 10px 0 5px 0;
		}

		.foot {
			margin: auto 6px auto 3px;
			display: flex;
			justify-content: space-between;

			.forget {
				// margin: auto auto 0 auto;
				text-decoration: underline;
				color: #142d88;
			}
		}


		.button {

			// background-color: #142d88;
			color: #142d88;
			width: 90%;
			// height: 50px;
			border: 0;

			// background-color: #fff;
			border-radius: 5px;
			// color: #000;
			text-align: center;
			margin: 10px auto;
			// font-size: 20px;
			// cursor: pointer;

		}
	}

	.button {
		border-radius: 3px;

	}

	.popup-content {
		max-width: 80vw;
		margin: 2vw;
		// border: 1px solid red;
		padding: 2vw;
	}

	.ipt {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		border: 1px solid #fff;
		padding: 10px 0 10px 30px;
		box-sizing: border-box;
		background-color: transparent;
		// outline: none;
		color: #000;
		font-size: 20px;
		transition: 0.2s;

		&:focus {
			border: 1px solid #142d88;
		}

	}

	.code {
		width: 100px;
		height: auto;
		// border:1px solid red;
		margin: 2px 2px auto auto;
		// filter: drop-shadow(10px 10px 10px rgba(0,0,0,.5));
		box-shadow: 1px 2px 2px 1px #888888;
		// background-image:v-bind(codeImg)
	}
</style>