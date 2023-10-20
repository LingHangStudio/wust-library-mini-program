import {
	defineStore
} from 'pinia';

export const useStore = defineStore('main', {
	state: () => ({
		userInfo: {
			displayName: "",
		},
		loginState: false,
		// 页面间传参：搜索的词，选择的类型
		pages: {
			searchValue: "",
			choiceType: ""
		},

	}),
	actions: {
		setloginState(state : Boolean) {
			this.loginState = state
		}
	},
});