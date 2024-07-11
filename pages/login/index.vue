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
	import { loginWust } from "@/api/user/login"
	import { getCodeApi } from "../../api/end"
	import { ref, onMounted } from "vue"
	import { getPersonInfo, infoParams } from "../../api/huiwen/center";
	// 引入crypto-js的MD5模块
	import CryptoJS from 'crypto-js';
	// 专属处理btoa atob
	import { weBtoa } from "../../utils/weapp-jwt"
	import { useStore } from "../../store";

	const store = useStore()
	// 忘记密码的提醒model
	const showToolTip = ref(null)
	// 存图片
	const codeImg = ref("")
	const code = ref("")
	// 错误提醒的节点
	const errorMsg = ref(undefined)
	const errorMsgContent = ref("")
	const loading = ref(true)
	// 页面来源
	// const isCenter = ref(false)

	const toolTipContent = `<h3 style="color:#142d88"><span style="display:inline-block;width:3px">|</span> 账号说明</h3>
		<p>1.教职工的账号为工号，学生的账号为学号。</p>
		<p>2.初始密码默认为姓名中姓的首字母大写+账号，如您修改过密码，则以修改后的密码为准。</p>
		<h3 style="color:#142d88"><span style="display:inline-block;width:3px">|</span> 忘记密码</h3>
		<p>用户忘记密码可通过两种方式进行密码重置：</p>
		<p>1. 用户可在图书馆官网登录页面点击“忘记密码”，输入正确信息找回密码。</p>
		<P>2. 用户可拨打网络信息中心服务电话：68862223或者联系服务邮箱：support@wust.edu.cn重置密码。</P>`
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

	//获取验证码
	const getCode = async () => {
		loading.value = true
		const res = await getCodeApi()
		if (res.data) {
			codeImg.value = "data:image/svg+xml;base64," + weBtoa(res?.data.codeSvg)
			code.value = res.data.text
		}
		else {
			uni.showToast({
				title: "验证码获取失败，请刷新重试",
				icon: "none"
			})
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
		myForm.value.validate((err : [], formData : any) =>
			!err && login(userForm.value.username, userForm.value.password))
	}



	const encrypt = (password : string, appid : string) => {
		// 第一次Base64编码
		const firstEncoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
		// 将第一次编码的结果与appid拼接  
		const combined = firstEncoded + appid;
		// 第二次Base64编码  
		const secondEncoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(combined));
		// 返回最终编码的字符串  
		return secondEncoded;
	};

	//获取时间currentTime
	const getCurrentTime = () => {
		// 创建一个Date对象  
		const now = new Date();
		// 获取年份  
		const year = now.getFullYear();
		// 获取月份，由于getMonth()返回的月份是从0开始的，所以要加1  
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		// 获取日期  
		const day = now.getDate().toString().padStart(2, '0');
		// 拼接成yyyyMMdd格式  
		const dateStr = year + month + day;
		//返回出去
		return dateStr
	}

	// 获取secret
	function getSecret(userName : string, appid : string, currentTime : string) {
		// 将用户名、appid和当前时间拼接成一个字符串  
		const inputString = userName + appid + currentTime;
		// 使用CryptoJS的MD5函数进行加密  
		const encryptedValue = CryptoJS.MD5(inputString).toString();
		// 返回加密后的字符串  
		return encryptedValue.toUpperCase();
	}

	//登陆{前端负责加密，接口为学校网络中心的，看不懂加密不要紧，学长我也看不懂哈，加密要求文件有，看文件去}
	const login = async (userName : string, passWord : string) => {
		let appid = "07E6724C8712B9F0"
		let password = encrypt(passWord, appid)
		let currentTime = getCurrentTime()
		let secret = getSecret(userName, appid, currentTime)
		let username = userName
		try {
			const data = {
				appid,
				username,
				secret,
				password,
			}
			const urlEnd = (`?username=${username}&appid=${appid}&password=${password}&secret=${secret}`)
			const res = await loginWust(data, urlEnd)
			// 后端返回的字符串”0”用俩个等于号免得他们改成数字0我们又要改
			if (res.code == 0) {
				uni.setStorageSync("loginState", true)
				uni.setStorageSync("loginInfo", { userName, passWord })
				//获取读者信息
				const infoParams : infoParams = {
					id: userName,
					type: 0,
					userIdentifierType: "0",
				};
				getInfo(infoParams);
				uni.reLaunch({
					url: "/pages/home/index",
				})
			}
			else {
				errorMsgContent.value = res.message;
				errorMsg.value.open()
			}
		} catch (e) {
			uni.showToast({
				title: "登录失败",
				icon: "error",
				duration: 2000,
			})
		}
	}

	//检查本地是否有登陆信息，有就不需要用户二次登陆，我们直接掉接口处理
	const loginStatus = () => {
		if (uni.getStorageSync("loginInfo")) {
			const loginInfo = uni.getStorageSync("loginInfo")
			login(loginInfo.userName, loginInfo.passWord)
		}
	}

	//获取个人信息，然后批量存储在store里面
	const getInfo = async (info : infoParams) => {
		const res = await getPersonInfo(info)
		if (res.code === 0) {
			store.userInfo = { ...store.userInfo, ...res.data };
			console.log("nihao", store.userInfo)
		}
	}


	onMounted(() => {
		// 本页面禁止分享
		uni.hideShareMenu({
			hideShareItems: ['shareAppMessage', 'shareTimeline'],
		})
		getCode()
		loginStatus()
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