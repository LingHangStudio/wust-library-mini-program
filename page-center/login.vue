<template>
	<view class="background">
		<image style="width: 100vw"
			src="https://tse4-mm.cn.bing.net/th/id/OIP-C.KPb9J7dN2DZ28HNApCvnOAHaEo?pid=ImgDet&rs=1" mode="scaleToFill">
		</image>
	</view>
	<view v-if="store.loginState" class="">
		<view class="">
			用户已经登录
		</view>
		<button @tap="logoutTip.open">退出登录</button>
	</view>
	<view v-else class="form">
		<uni-easyinput class="input" v-model="userForm.username" :inputBorder="false" maxlength="13"
			prefixIcon="person-filled" type="number" placeholder="请输入学号/工号" />
		<uni-easyinput class="input" v-model="userForm.password" :inputBorder="false" prefixIcon="locked"
			type="password" placeholder="请输入密码" />
		<view @tap="showToolTip.open()" class="forget">
			忘记密码?
		</view>
		<view class="button">
			<button @tap="login">提交</button>
		</view>
	</view>

	<uni-popup ref="logoutTip" type="dialog" background-color="#fff">
		<uni-popup-dialog type="warn" cancelText="关闭" confirmText="退出" title="通知" content="是否退出登录？" @confirm="logout"
			@close="logoutTip.close()"></uni-popup-dialog>
	</uni-popup>

	<uni-popup ref="showToolTip" type="center" background-color="#fff">
		<view class="popup-content" v-html="toolTipContent"></view>
	</uni-popup>
</template>

<script setup lang="ts">
	import { loginAPI, login1API } from "@/api/user"
	import { loginFinalApi } from "@/api/huiwen/home"
	import { ref } from "vue"
	import { useStore } from "@/store"
	import RSA from "@/utils/rsa.js"
	const store = useStore()
	const showToolTip = ref(null)
	const logoutTip = ref(null)

	const toolTipContent = `<h3>账号说明</h3>
<p>1.教职工的账号为工号，学生的账号为学号。</p>
<p>2.初始密码默认为姓名中姓的首字母大写+账号，如您修改过密码，则以修改后的密码为准。</p>
<h3>忘记密码</h3>
<p>用户忘记密码可通过两种方式进行密码重置：</p>
<p>1. 用户可在登录页面点击“忘记密码”，输入正确信息找回密码。</p>
<P>2. 用户可持有效证件（身份证、校园卡）至图书馆二楼服务台重置密码。</P>`
	const userForm = ref({
		username: "202113407294",
		password: "www.29900",
		service: "https://libsys.wust.edu.cn:443/meta-local/opac/cas/rosetta",
	})
	const login = async () => {
		const rsaTokenPublicModulus = 'b5eeb166e069920e80bebd1fea4829d3d1f3216f2aabe79b6c47a3c18dcee5fd22c2e7ac519cab59198ece036dcf289ea8201e2a0b9ded307f8fb704136eaeb670286f5ad44e691005ba9ea5af04ada5367cd724b5a26fdb5120cc95b6431604bd219c6b7d83a6f8f24b43918ea988a76f93c333aa5a20991493d4eb1117e7b1'
		const rsaTokenPublicExponent = '10001'
		const password = RSA.encryptedString(RSA.getKeyPair(rsaTokenPublicExponent, '', rsaTokenPublicModulus), userForm.value.password)
		console.log('password', password)
		try {
			// const res1 = await loginAPI({ ...userForm.value, password })
			// console.log('res', res1)
			// if (res1) {
			// 	const res2 = await login1API(res1.data)
			// 	console.log('res2', res2)
			// 	// 第三个接口，请求自己的后台，获取到Cookie
			// 	if (res2) {
			// 		console.log('info', await loginFinalApi(res2.data))
			// 	}
			// 	// 获取到cookie后，
			// 	// 请求https://libsys.wust.edu.cn/meta-local/opac/users/info?isPlaintext=true
			// 	// 对cookie进行验证
			// 	// 请求.....
			// }

			//test 登录成功后的处理
			uni.setStorageSync("Cookie", "test");
			store.setloginState(true)
			uni.navigateBack()
		} catch (e) {
			console.log(e)
			uni.showToast({
				title: "登录失败",
				duration: 2000
			})
		}
	}

	const logout = () => {
		store.setloginState(false)
		uni.removeStorageSync('Cookie')
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

	.popup-content {
		max-width: 80vw;
		margin: 2vw;
		// border: 1px solid red;
		padding: 2vw;
	}
</style>