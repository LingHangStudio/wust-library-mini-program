<template>
	<view class="" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
		<view class="background">
			<image src="https://b.zol-img.com.cn/sjbizhi/images/11/320x510/1591843603385.jpg"
				style="width: 100%;height: 100%;" mode="aspectFill"></image>
		</view>
		<!-- 介绍内容 -->
		<view v-for="(item,index) in aboutMeContent.content" :key="index" class="">
			<view :id="'photo_'+index" :class="{active:activeIndex===index}" class="box-font">
				<view class="bgc">
					<view class="textP">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view v-for="index in aboutMeContent.content.length" :key="index"
				:class="{activeIndex:activeIndex===index-1}" class="footerItem" @click="activeIndex = index-1">
				<span>&bull;</span>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const activeIndex = ref(0)
	const aboutMeContent = {
		title: "关于本馆",
		content: [
			`武汉科技大学图书馆始建于1958年，是湖北省高校大型图书馆之一。
			现有校本部图书馆，黄家湖新校区图书馆两座馆舍，校本部图书馆面积11000平方米，
			黄家湖新校区图书馆面积44000平方米，另有16个学院分馆，馆舍总面积达6万余平方米。
			`,
			`武汉科技大学是一所以工科为主，理学、经济学、管理学、法学、文学、医学等多学科协调发展的综合性大学。
			图书馆作为学校的文献信息中心，根据学校发展和专业设置，进行馆藏资源建设。
			我馆通过多途径有计划、有重点的采集国内外书刊资料，
			重点收藏材料、冶金、化工、机械、电子与信息、建筑、环境、医学、管理等科学文献，
			其馆藏文献类型包括图书、期刊、学位论文、会议录、标准、专利、产品目录及各种工具书；
			`,
			`近年来，图书馆重视发展电子资源，根据学校教学、科研工作需要，
			有计划、多渠道的重点引进各种中文光盘、网络数据库、多媒体教学课件、VCD影视资料等。
			截至2017年底，全馆馆藏纸质文献总量259.83万册，购买中外文数据库76个，电子图书350.64万册，音频2,451小时。
			`,
			`
			图书馆坚持"读者第一，服务育人"的宗旨，实行全年、全开架式开放，提高了图书文献资源的利用率。
			在为读者提供信息咨询、文献检索、新书推荐等传统服务的同时，自建了5个专题数据库，建立了我馆外文原版期刊目次库和重点学科网络资源导航系统，
			开通了网络即时咨询系统，实现了印刷型文献借阅、电子阅览、信息检索、文献传递、用户培训、解答咨询等工作的网络化服务。
			`,
			`
			图书馆自动化工作从90年代初起步至今，在硬件环境和软件使用上都打下坚实基础。
			组建了主干速率为100M带宽的馆内局域网络，并实现与校园网的千兆带宽连接，已建成的基于Oracle和NT技术的DataBase
			Server、Windows2000 advance server、Web server、FTP Server等平台，
			实现了图书馆业务管理的自动化与办公自动化以及Internet上的电子资源共享。`, `
			我馆于1994年开始实现计算机管理，引进的国内领先水平的文献信息管理系统Libsys（南京汇文）覆盖图书馆主要业务工作。
			中外文图书采访、编目、典藏、流通、阅览等业务工作已实现网络化管理，借书、还书、借阅证管理等已采用计算机管理，
			"图书馆信息查询系统"可供读者从网上迅速、准确、方便的检索到馆藏书目信息及读者借阅情况动态信息，
			还提供有"网上预约"、"网上续借"、"网上征订与荐购"等新的服务。`,
			`随着计算机网络与信息技术的发展和学校对图书馆各项经费投入的逐年增加，
			图书馆正逐步向电子化、网络化和数字化方向发展，服务方式与文献信息管理正在由传统的、被动的，
			手工的转向现代的、主动的、自动化、网络化方式，读者文献信息服务水平不断提升，文献信息中心的作用日益加强。
			我馆已建成图书馆主页，将图书馆各项服务内容中丰富的文献信息借助校园网传递给学校每个角落，开展全天候24小时服务。
			`, `
			另外，图书馆建成的电子阅览室，其先进的光盘网络系统可支持校园网上多用户同时访问；为读者提供国内外重要光盘数据库，
			网络数据库检索；学习和利用各种多媒体课件等。为了提高光盘数据库利用率和为读者提供更多方便，
			我馆已将部分使用频率高的中、英文光盘数据库、随书光盘上载到图书馆主页，
			师生们通过校园网可在办公室、实验室、宿舍、家中随时查询、利用。`
		]
	}

	const startX = ref(0)
	const moveRight = ref(false)
	// 左右滑动监听
	const onTouchStart = (e) => {
		startX.value = e.changedTouches[0].clientX; // 获取触摸开始时的x坐标
	}

	const onTouchMove = (e) => {
		const moveX = e.changedTouches[0].clientX; // 获取触摸移动时的x坐标
		// const moveY = e.changedTouches[0].clientY; // 获取触摸移动时的y坐标
		const diffX = moveX - startX.value; // 计算触摸移动距离
		// const diffY = moveY - startY.value
		if (diffX > 30) {
			// 向右滑动事件
			moveRight.value = true
		} else if (diffX < -30) {
			moveRight.value = false
		}
	}

	const onTouchEnd = (e) => {
		if (moveRight.value) {
			moveRight.value = false
			// activeIndex.value = (activeIndex.value - 1) % 8
			activeIndex.value > 0 ? (activeIndex.value--) : (activeIndex.value = 7)
		} else {
			activeIndex.value = (activeIndex.value + 1) % 8
		}
		// 清除起始坐标
		startX.value = 0;
	}
</script>

<style scoped lang="scss">
	.background {
		height: 100vh;
	}

	.footer {
		width: 80vw;
		position: fixed;
		bottom: 1.5em;
		left: 10vw;
		display: flex;
		justify-content: space-around;
		z-index: 2;
		text-align: center;

		.footerItem {
			bottom: 1.5em;
			width: 2em;
			height: 2em;
			line-height: 2em;
			text-align: center;
			border-radius: 100%;
			border: 1px solid #142d88;
			background: rgba(255, 255, 255, 0.6);
			z-index: 2;
			transition: background 0.5s ease, color 0.5s ease;
			text-align: center;
		}

		@media (prefers-color-scheme: dark) {
			.footerItem {
				background: rgba(0, 0, 0, 0.6);
			}
		}

	}

	.activeIndex {
		color: #fff;
		background: #142d88 !important;
		border: 1px solid #142d88;
	}


	.box-font {
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		// width: 80vw;
		// height: 100%;
		margin: auto;
		overflow: hidden;
		z-index: 0;
		transition: height .7s ease, opacity .7s ease;
	}

	#photo_0 {
		height: 0;
	}

	#photo_1 {
		width: 70vmin;
		height: 80vmin;
		opacity: 0;
	}

	#photo_2 {
		height: 0;

	}

	#photo_3 {
		width: 70vmin;
		height: 80vmin;
		opacity: 0;
	}

	#photo_4 {
		height: 0;
	}

	#photo_5 {
		opacity: 0;
		width: 70vmin;
		height: 80vmin;
	}

	#photo_6 {
		height: 0;
	}

	#photo_7 {
		opacity: 0;
		width: 70vmin;
		height: 80vmin;
	}

	// 文字展示卡片的外层
	.active {
		padding: 10px 8px;
		width: 80vmin !important;
		height: 90vmin !important;
		opacity: 1 !important;
	}

	// 文字展示卡片的内层
	.bgc {
		box-shadow: 0 12px 5px -10px rgba(20, 45, 136, 0.6), 0 0 4px 0 rgba(20, 45, 136, 0.6);
		background-color: rgba(255, 255, 255, 0.8);
		border: none;
		font-size: 1.1rem;
		padding: 10px;
		border-radius: 0.3em;
	}

	@media (prefers-color-scheme: dark) {
		.bgc {
			background-color: rgba(0, 0, 0, 0.8);
		}
	}

	.textP:first-letter {
		float: left;
		padding-right: 5px;
		font-size: 1.5em;
		padding: 0.1em;
		color: $theme-color;
		vertical-align: middle;
	}
</style>