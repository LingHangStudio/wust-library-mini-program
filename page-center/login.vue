<template>
	<view class="root">
		<view class="form-wrapper animate__animated animate__slideInRight">
			<view class="form">
				<div :class="loading ? 'h1flash' : 'h1'">Login</div>
				<uni-forms ref="myForm" :model-value="userForm" :rules="rules">
					<uni-forms-item name="username">
						<uni-easyinput v-model="userForm.username" primary-color="#142d88" :maxlength="18"
							confirm-type="next" type="text" prefix-icon="person-filled" placeholder="请输入学号/工号" />
					</uni-forms-item>
					<uni-forms-item name="password">
						<uni-easyinput v-model="userForm.password" primary-color="#142d88" type="password"
							:maxlength="32" prefix-icon="locked" placeholder="请输入密码" />
					</uni-forms-item>
					<view class="" style="display: flex; width: 100%">
						<uni-forms-item name="code">
							<uni-easyinput v-model="userForm.code" primary-color="#142d88" :maxlength="4"
								confirm-type="send" class="ipt" type="text" prefix-icon="flag" placeholder="请输入验证码"
								:clearable="false" />
						</uni-forms-item>
						<view class="code" hover-class="codeActive" @tap="getCode">
							<image :src="codeImg" mode="" style="width: 100px; height: 30px"></image>
						</view>
					</view>
					<view class="foot">
						<view class="forget" @tap="showToolTip.open()"> 忘记密码? </view>
					</view>
					<button hover-class="self-button-active" class="self-button" @tap="vertify">登录</button>
				</uni-forms>
			</view>
		</view>
	</view>

	<uni-popup ref="showToolTip" type="bottom" background-color="#fff">
		<view class="popup-content bgc-liner" v-html="toolTipContent"></view>
	</uni-popup>

	<uni-popup ref="errorMsg" type="message">
		<uni-popup-message type="error" :message="errorMsgContent" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { loginAPI, login1API } from "@/api/user/user"
	import { loginFinalApi, getCodeApi } from "@/api/end"
	import { ref, onMounted } from "vue"
	
	// #ifndef APP-PLUS
	import { useStore } from "@/store"
	// #endif
	
	import RSA from "@/page-center/utils/rsa.js"
	// 专属处理btoa atob
	import { weBtoa } from "@/page-center/utils/weapp-jwt"
	
	// #ifndef APP-PLUS
	const store = useStore()
	// #endif
	
	// 忘记密码的提醒model
	const showToolTip = ref(null)
	// 存图片
	const codeImg = ref("")
	const code = ref("")
	// 错误提醒的节点
	const errorMsg = ref(null)
	const errorMsgContent = ref("")
	//
	const loading = ref(true)

	// 页面来源
	// const isCenter = ref(false)

	const toolTipContent = `<h3 style="color:#142d88"><span style="display:inline-block;width:3px">|</span> 账号说明</h3>
		<p>1.教职工的账号为工号，学生的账号为学号。</p>
		<p>2.初始密码默认为姓名中姓的首字母大写+账号，如您修改过密码，则以修改后的密码为准。</p>
		<h3 style="color:#142d88"><span style="display:inline-block;width:3px">|</span> 忘记密码</h3>
		<p>用户忘记密码可通过两种方式进行密码重置：</p>
		<p>1. 用户可在图书馆官网登录页面点击“忘记密码”，输入正确信息找回密码。</p>
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
			rules: [
				{
					required: true,
					errorMessage: "请输入学号/工号",
				},
				{
					minLength: 6,
					maxLength: 18,
					errorMessage: "长度在 {minLength} 到 {maxLength} 个字符",
				},
			],
		},
		password: {
			rules: [
				{
					required: true,
					errorMessage: "请输入密码",
				},
			],
		},
		code: {
			// 防止没获取到验证码
			rules: [
				{
					required: true,
					errorMessage: "请输入验证码",
				},
			],
		},
	}

	const encrypt = (password : string) => {
		const rsaTokenPublicModulus =
			"b5eeb166e069920e80bebd1fea4829d3d1f3216f2aabe79b6c47a3c18dcee5fd22c2e7ac519cab59198ece036dcf289ea8201e2a0b9ded307f8fb704136eaeb670286f5ad44e691005ba9ea5af04ada5367cd724b5a26fdb5120cc95b6431604bd219c6b7d83a6f8f24b43918ea988a76f93c333aa5a20991493d4eb1117e7b1"
		const rsaTokenPublicExponent = "10001"
		return RSA.encryptedString(RSA.getKeyPair(rsaTokenPublicExponent, "", rsaTokenPublicModulus), password)
	}

	const login = async () => {
		let password = encrypt(userForm.value.password)
		try {
			const res1 = await loginAPI({ ...userForm.value, password })
			console.log("res1", res1)
			if (res1?.data.data) {
				if (res1?.data.data.code === "NOUSER") {
					errorMsgContent.value = "账号不存在。"
				} else if (res1?.data.data.code === "PASSERROR") {
					errorMsgContent.value = `密码错误。一共${res1?.data.data.data[0]} 已经错误${res1?.data.data.data[2]},`
				} else {
					errorMsgContent.value = "账号异常"
				}
				errorMsg.value.open()
				return
			}
			const res2 = await login1API(res1.data.tgt)
			console.log("res2", res2)
			// 第三个接口，请求自己的后台，获取到Cookie
			let myCookie = await loginFinalApi(res2.data)
			console.log("Cookie", myCookie)
			// 登录成功后的处理
			uni.setStorageSync("loginState", true)
			uni.setStorageSync("Cookie", myCookie.data.cookie.split(";")[0])
			uni.setStorageSync("loginInfo", { username: userForm.value.username, password })
			// #ifndef APP-PLUS
			store.setloginState(true)
			// #endif
			uni.reLaunch({
				url: "/pages/home/index",
			})
		} catch (e) {
			uni.showToast({
				title: "登录失败",
				icon: "error",
				duration: 2000,
			})
		}
	}

	const getCode = async () => {
		loading.value = true
		const res = await getCodeApi()
		if (res) {
			codeImg.value = "data:image/svg+xml;base64," + weBtoa(res?.data.codeSvg)
			code.value = res.data.text
		}
		loading.value = false
	}

	// 表单校验
	const vertify = () => {
		if (code.value.toLowerCase() !== userForm.value.code.toLowerCase()) {
			errorMsgContent.value = "验证码错误"
			errorMsg.value.open()
			return
		}
		myForm.value.validate((err : [], formData : any) => !err && login())
	}
	
	onMounted(() => {
		// 本页面禁止分享
		uni.hideShareMenu({
			hideShareItems: ['shareAppMessage', 'shareTimeline'],
		})
		getCode()
	})
</script>

<style scoped lang="scss">
	.root {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-image: url("https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1");
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
		width: 80vw;

		.h1 {
			position: relative;
			color: #142d88;
			text-align: center;
			font-size: 55px;
			margin-bottom: 20px;
			font-family: cursive;
		}

		.h1flash {
			position: relative;
			color: #142d88;
			text-align: center;
			font-size: 55px;
			margin-bottom: 20px;
			font-family: cursive;
		}

		// 闪光效果
		.h1::before {
			content: "";
			position: absolute;
			left: 0px;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(135deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 70%);
			background-size: 200%;
			animation: wipes 2s 1 reverse;
		}

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
				text-decoration: underline;
				color: #142d88;
			}
		}
	}

	.button {
		border-radius: 3px;
	}

	.popup-content {
		max-width: 100vw;
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
		// width: 100px;
		height: 35px;
		padding: auto 0;
		box-sizing: border-box;
		border: 1px solid #e5e5e5;
		// box-shadow: 1px 2px 2px 1px #888888;
		// background-image:v-bind(codeImg)
	}

	.codeActive {
		transition-duration: 0;
		// animation: getCode 1.5s 1 ease-out;
		animation: getCode 0.75s 1;
		// box-shadow: 0 0 0 2px #cff09e, 0 0 0 4px #3ac7bd;
	}

	@keyframes getCode {
		from {
			transform: scale(1, 1);
		}

		25% {
			transform: scale(0.5, 0.5);
		}

		50% {
			transform: scale(0, 0);
		}

		75% {
			transform: scale(0.5, 0.5);
		}

		to {
			transform: scale(1, 1);
		}
	}
</style>