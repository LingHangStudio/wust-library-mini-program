<template>
	<web-view :src="goToLink"></web-view>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	const goToLink = ref("")
	const goTo = (value) => {
		//有 馆藏目录和数据库搜索
		console.log(value);
		if (value.strSearchType1 == "1") {
			// 数据库
			goToLink.value = 'https://libsys.wust.edu.cn/mspace/database/1?searchWord=' + value.keyword
		} else if (value.strSearchType2 == "0") {
			// 馆藏目录
			let type = "titles"
			switch (value.strSearchType1) {
				case "0": type = "titles"; break;
				case "1": type = "authors"; break;
				case "2": type = "subjects"; break;
				case "3": type = "series"; break;
			}
			console.log("https://libsys.wust.edu.cn/space/searchList?strSearchType=" + type + "&strText=" + value.keyword);
			goToLink.value = "https://libsys.wust.edu.cn/space/searchList?strSearchType=" + type + "&strText=" + value.keyword
		} else {

		}
	}
	onLoad((e) => {
		if (e) {
			goTo(e)
		}
	})

		// 所有的外部链接
		//
		// 馆藏目录搜索： 手机端访问的格式a
		// https://libsys.wust.edu.cn/mspace/search/list?strSearchType=titles&strText=%E4%B8%89%E4%BD%93
		// let baseUrl =
		//   "https://libsys.wust.edu.cn/space/searchList?strSearchType=";
		//
		//数据库搜索：
		// console.log('移动设备')
		//baseUrl = 'https://libsys.wust.edu.cn/mspace/database/0?searchWord='
		// const URL = [
		// 	"https://libsys.wust.edu.cn/space/searchList?strSearchType="
		// ]
	//给两个参数：方法，值
</script>

<style>
</style>