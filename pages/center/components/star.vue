<template>
	<canvas type="2d" style="width: 100vw;height:100px;margin: 0 auto;border:1px solid red" canvas-id="myCanvas"
		id="myCanvas"></canvas>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	// 定义星星的配置
	const STAR_COLOR = '#fff';
	const STAR_SIZE = 10;
	// 定义星星的最小缩放比例
	const STAR_MIN_SCALE = 0.2;
	// 定义溢出阈值
	const OVERFLOW_THRESHOLD = 50;
	const STAR_COUNT = 4;
	// (window.innerWidth + window.innerHeight) / 8;


	// const canvas = document.querySelector('canvas');
	// 获取canvas的绘图上下文
	// const context = canvas.getContext('2d');
	// 定义缩放比例
	let scale = 1; // device pixel ratio
	// 定义宽度和高度
	let width = 800;
	let height = 100;
	// 定义星星数组
	let stars = ref([]);
	// 定义鼠标指针的位置
	// 定义速度对象

	let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
	// 定义触摸输入标志
	// let touchInput = false;
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

	// 动画的每一帧
	function step(context) {
		console.log("step")
		// 清空画布
		// context.clearRect(0, 0, width, height);
		// 更新星星的位置和速度
		update();
		// 绘制星星
		render(context);
		// 请求下一帧动画
		// setInterval(() => {
		// 	step(context)
		// }, 300)
		// requestAnimationFrame(step)
	}
	// 更新星星的位置和速度
	function update() {
		// 缓动速度
		velocity.tx *= 0.96;
		velocity.ty *= 0.96;
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
		// 遍历所有星星
		// console.log(stars.value)

		context.beginPath();
		stars.value.forEach((star, index) => {
			// 设置绘制星星的样式
			context.lineCap = 'round';
			context.lineWidth = STAR_SIZE * star.z * scale;
			context.globalAlpha = 0.5 + 0.5 * Math.random();
			context.strokeStyle = STAR_COLOR;
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
		context.draw()
	}

	onMounted(() => {
		// 微信小程序
		setTimeout(res => {
			uni.createSelectorQuery().select('#myCanvas').fields({ node: true, size: true }).exec(res => {
				console.log("canvas res", res)
				const canvas = res[0].node
				let ctx = canvas.getContext('2d')

				// const dpr = wx.getSystemInfoSync().pixelRatio
				// canvas.width = res[0].width * dpr
				// canvas.height = res[0].height * dpr
			});
		}, 2000)


		// uni.createSelectorQuery().in(this).select('#myCanvas')
		// 	.fields({ node: true })
		// 	.exec((res) => {
		// 		console.log("res", res)
		// 		const canvas = res[0].node

		// 		const ctx = canvas.getContext('2d')
		// 		console.log(canvas, ctx)
		// 		// 生成星星
		// 		for (let i = 0; i < STAR_COUNT; i++) {
		// 			stars.value.push({
		// 				x: 0,
		// 				y: 0,
		// 				z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
		// 			});
		// 		}
		// 		// 调整大小
		// 		stars.value.forEach(placeStar);
		// 		// 运行动画
		// 		step(ctx);
		// 	})




		// 网页
		// let context = uni.createCanvasContext('myCanvas')
		// // 生成星星
		// for (let i = 0; i < STAR_COUNT; i++) {
		// 	stars.value.push({
		// 		x: 0,
		// 		y: 0,
		// 		z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
		// 	});
		// }
		// // 调整大小
		// stars.value.forEach(placeStar);
		// // 运行动画
		// step(context);
	})
</script>

<style scoped lang="scss">
	canvas {
		border: 1px solid red;
		position: fixed;
		width: 100%;
		height: 100%;
	}
</style>