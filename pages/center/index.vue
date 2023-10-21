<template>
	<!-- <uni-card margin="0px 0px 5px 0px" :border="false" padding="0px" spacing="0px"> -->
	<!-- <view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg');"> -->
	<view class="user">
		<canvas type="2d" style="width: 100vw;height:100%" canvas-id="myCanvas" id="myCanvas"></canvas>
		<!-- <Star></Star> -->
		<view class="header-image" hover-class="back">
			<!-- <img class="header-image" :src="WechatInfo.avatarUrl" alt="avatar"> -->
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			{{store.userInfo.displayName}}
		</view>
		<!-- <view v-else class="info">
			微信用户
		</view> -->
	</view>
	<!-- <view class="user" style="background-image: url('https://cdn.zhoukaiwen.com/zjx_me_bg6.jpg')">
		<view class="header-image" hover-class="back">
			<image class="header-image" src="@/static/face1.png" alt="avatar"></image>
		</view>
		<view class="info">
			微信用户
		</view>
		<view  class="info">
				{{WechatInfo.nickName}}
			</view>
	</view> -->
	<!-- </uni-card> -->

	<Menu></Menu>
	<!-- <button @tap="goTo({url:'/page-service/test'})">测试</button> -->

	<view class="copyright">
		<!-- #ifdef MP-WEIXIN-->
		<official-account></official-account>
		<!-- #endif -->
		<!-- <p>Copyright © 2023</p> -->
		<p>v{{systemInfo.appVersion}}</p>
		<p>公众号：武汉科技大学图书馆</p>
	</view>
</template>

<script setup lang="ts">
	import Menu from "@/pages/center/components/menu.vue"
	import { ref, Ref } from "vue"
	import { onShow, onReady, onUnload, onHide } from "@dcloudio/uni-app"
	import type { systemInfoType } from "@/utils/types/center"
	import { useStore } from "@/store"
	const store = useStore()
	// const user = uni.getStorageSync("userInfo")
	const systemInfo : Ref<systemInfoType> = ref({})

	uni.getSystemInfo({
		success: function (res) {
			systemInfo.value = {
				"appName": res.appName,
				"appVersion": res.appVersion,
				"osName": res.osName,
				"uniPlatform": res.uniPlatform,
				"width": res.screenWidth,
				"height": res.screenHeight
			}
		},
	})

	onShow(() => {
		store.userInfo = uni.getStorageSync("userInfo") || { displayName: "微信用户" }
		let fineSum = uni.getStorageSync("fineSum")
		if (fineSum && fineSum !== '0') {
			uni.setTabBarBadge({
				index: 3,
				text: fineSum,
				fail: (result : any) => {
					console.log(result)
				}
			})
		} else {
			uni.removeTabBarBadge({
				index: 3,
				fail: (result : any) => {
					console.log(result)
				}
			})
		}
		console.log("ctx", ctx.value)
		if (ctx.value) {
			timer = setInterval(() => {
				step(ctx.value)
			}, 3000)
		}
	})

	// canvas
	// 定义星星的配置
	const STAR_SIZE = 2;
	// 定义星星的最小缩放比例
	const STAR_MIN_SCALE = 0.2;
	// 定义溢出阈值
	const OVERFLOW_THRESHOLD = 50;
	const STAR_COUNT = 24;
	// 定义缩放比例
	let scale = 1;
	// 定义宽度和高度
	let width = 800;
	let height = 400;
	// 定义星星数组
	let stars = ref([]);
	// 定义鼠标指针的位置
	// 定义速度对象

	let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
	// 定义触摸输入标志
	// 将星星放置到随机位置
	function placeStar(star : any) {
		star.x = Math.random() * width;
		star.y = Math.random() * height;
	}
	// 回收星星并重新放置到新的位置
	function recycleStar(star) {
		// 初始化方向为 'z'
		let direction = 'z';
		// 获取速度的绝对值
		let vx = Math.abs(velocity.x);
		let vy = Math.abs(velocity.y);
		// 如果速度的绝对值大于1，则根据速度的大小随机确定方向
		if (vx > 1 || vy > 1) {
			let axis;
			// 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
			if (vx > vy) {
				axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
			} else {
				axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
			}
			// 根据方向确定具体的移动方向
			if (axis === 'h') {
				direction = velocity.x > 0 ? 'l' : 'r';
			} else {
				direction = velocity.y > 0 ? 't' : 'b';
			}
		}
		// 随机设置星星的缩放比例
		star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
		// 根据方向设置星星的位置
		if (direction === 'z') {
			// 如果方向为 'z'，则将星星放置在屏幕中心
			star.z = 0.1;
			star.x = Math.random() * width;
			star.y = Math.random() * height;
		} else if (direction === 'l') {
			// 如果方向为 'l'，则将星星放置在屏幕左侧
			star.x = -OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
		} else if (direction === 'r') {
			// 如果方向为 'r'，则将星星放置在屏幕右侧
			star.x = width + OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
		} else if (direction === 't') {
			// 如果方向为 't'，则将星星放置在屏幕顶部
			star.x = width * Math.random();
			star.y = -OVERFLOW_THRESHOLD;
		} else if (direction === 'b') {
			// 如果方向为 'b'，则将星星放置在屏幕底部
			star.x = width * Math.random();
			star.y = height + OVERFLOW_THRESHOLD;
		}
	}

	let timer = null
	// 动画的每一帧
	function step(context) {
		// debugger
		// 清空画布
		context.clearRect(0, 0, width, height);
		// 更新星星的位置和速度
		update();
		// 绘制星星
		render(context);
		// 请求下一帧动画
		timer = setInterval(() => {
			step(context)
		}, 3000)
		// requestAnimationFrame(step)
	}
	// 更新星星的位置和速度
	function update() {
		// 缓动速度
		// velocity.tx *= 0.96;
		// velocity.ty *= 0.96;
		velocity.tx *= 0.66;
		velocity.ty *= 0.66;
		// 更新速度
		velocity.x += (velocity.tx - velocity.x) * 0.8;
		velocity.y += (velocity.ty - velocity.y) * 0.8;
		// 遍历所有星星
		stars.value.forEach((star) => {
			// 根据速度和缩放比例更新星星的位置
			star.x += velocity.x * star.z;
			star.y += velocity.y * star.z;
			// 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
			star.x += (star.x - width / 2) * velocity.z * star.z;
			star.y += (star.y - height / 2) * velocity.z * star.z;
			// 更新星星的缩放比例
			star.z += velocity.z;
			// 如果星星超出屏幕范围，则重新放置到屏幕上
			if (
				star.x < -OVERFLOW_THRESHOLD ||
				star.x > width + OVERFLOW_THRESHOLD ||
				star.y < -OVERFLOW_THRESHOLD ||
				star.y > height + OVERFLOW_THRESHOLD
			) {
				recycleStar(star);
			}
		});
	}
	// 绘制星星
	function render(context) {
		context.beginPath();
		stars.value.forEach((star) => {
			// 设置绘制星星的样式
			context.lineCap = 'round';
			context.lineWidth = STAR_SIZE * star.z * scale;
			context.globalAlpha = 0.5 + 0.5 * Math.random();
			context.strokeStyle = '#fff';
			// 绘制星星的路径
			// context.beginPath();
			context.moveTo(star.x, star.y);
			// 计算星星的尾巴坐标
			let tailX = velocity.x * 2;
			let tailY = velocity.y * 2;
			// 如果尾巴坐标的绝对值小于0.1，则设置为0.5
			if (Math.abs(tailX) < 0.1) tailX = 0.5;
			if (Math.abs(tailY) < 0.1) tailY = 0.5;
			// 绘制星星的尾巴
			context.lineTo(star.x + tailX, star.y + tailY);
			context.stroke();
		});
		// #ifndef MP-WEIXIN
		context.draw()
		// #endif
	}

	const ctx = ref(null)
	onReady(() => {
		console.log("onReady")
		// #ifdef MP-WEIXIN
		setTimeout(() => {
			uni.createSelectorQuery().select('#myCanvas').fields({ node: true, size: true }).exec(res => {
				ctx.value = res[0].node.getContext('2d')
				// 生成星星
				for (let i = 0; i < STAR_COUNT; i++) {
					stars.value.push({
						x: 0,
						y: 0,
						z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
					});
				}
				// 放置
				stars.value.forEach(placeStar);
				// 运行动画
				step(ctx.value);
			});
		}, 1000)
		// #endif

		// #ifdef H5	
		let context = uni.createCanvasContext('myCanvas')
		// 生成星星
		for (let i = 0; i < STAR_COUNT; i++) {
			stars.value.push({
				x: 0,
				y: 0,
				z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
			});
		}
		// 调整大小
		stars.value.forEach(placeStar);
		// 运行动画
		step(context);
		// #endif
	})

	onHide(() => {
		console.log("hide")
		clearInterval(timer)
	})

	onUnload(() => {
		clearInterval(timer)
	})
</script>

<style lang="scss">
	.user {
		width: 100%;
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		background-image: linear-gradient(-225deg, #231557 0%,
				#43107a 29%, #FF1361 100%);

		#myCanvas {
			position: absolute;
		}

		.header-image {
			z-index: 100;
			border-radius: 50%;
			display: block;
			width: 4rem;
			height: 4rem;
			margin: 5px auto;

			position: relative;
			transform-style: preserve-3d;
			transition: 1s;
		}

		.info {
			color: white;
			font-size: 1.5rem;
			margin: 0 auto;
			padding: 10px 0;
		}
	}

	.back {
		transform: rotateY(180deg);
	}

	.copyright {
		position: absolute;
		width: 750rpx;
		text-align: center;
		color: #666777;
		bottom: 20px;
	}
</style>