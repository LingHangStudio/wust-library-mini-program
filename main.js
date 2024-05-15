import App from './App'
// 下面才是vue3
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'

// #ifdef MP-WEIXIN
//引入pinia
import * as Pinia from 'pinia';
// 全局分享 混入，混入的优先级最高
import share from "./utils/share";
// #endif

export function createApp() {
	const app = createSSRApp(App)
	// #ifdef MP-WEIXIN
	app.mixin(share).use(Pinia.createPinia());
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