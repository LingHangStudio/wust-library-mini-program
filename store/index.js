import {
	defineStore
} from 'pinia';

export const useCounterStore = defineStore('main', {
	state: () => {
		return {

			// 页面间传参：搜索的词，选择的类型
			pages: {
				searchValue: "",
				choiceType: ""
			}
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		// increment() {
		// 	this.count++;
		// },
	},
});