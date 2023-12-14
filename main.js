import App from './App'

// #ifndef VUE3
// import Vue from 'vue'
// Vue.config.productionTip = false
// App.mpType = 'app'

// try {
// 	function isPromise(obj) {
// 		return (
// 			!!obj &&
// 			(typeof obj === "object" || typeof obj === "function") &&
// 			typeof obj.then === "function"
// 		);
// 	}

// 	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
// 	uni.addInterceptor({
// 		returnValue(res) {
// 			if (!isPromise(res)) {
// 				return res;
// 			}
// 			return new Promise((resolve, reject) => {
// 				res.then((res) => {
// 					if (res[0]) {
// 						reject(res[0]);
// 					} else {
// 						resolve(res[1]);
// 					}
// 				});
// 			});
// 		},
// 	});
// } catch (error) {}

// const app = new Vue({
// 	...App
// })

// app.$mount()
// // #endif

// 下面才是vue3
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

// #ifdef MP-WEIXIN
//引入pinia
import * as Pinia from 'pinia';
// 全局分享 混入
import share from "./utils/share";
// #endif

export function createApp() {
	const app = createSSRApp(App)
	// #ifdef MP-WEIXIN
	app.mixin(share)
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
	// #endif

	// #ifdef APP-PLUS
	return {
		app
	}
	// #endif
}
// #endif