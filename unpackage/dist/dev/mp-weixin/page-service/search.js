"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_data_select2 + _easycom_uni_search_bar2 + _easycom_uni_card2)();
}
const _easycom_uni_data_select = () => "../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_search_bar = () => "../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_card = () => "../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_search_bar + _easycom_uni_card)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const searchHistory = common_vendor.index.getStorageSync("searchHistory") ? common_vendor.ref(common_vendor.index.getStorageSync("searchHistory")) : common_vendor.ref([]);
    let collectionHotWord = common_vendor.reactive([]);
    let searchType = common_vendor.reactive([
      {
        value: 0,
        text: "馆藏目录",
        array: [
          {
            value: 0,
            text: "题名"
          },
          {
            value: 1,
            text: "作者"
          },
          {
            value: 2,
            text: "主题"
          },
          {
            value: 3,
            text: "刊名"
          }
        ]
      },
      {
        value: 1,
        text: "数据库"
      },
      {
        value: 2,
        text: "站内检索"
      }
    ]);
    const choiceType = common_vendor.ref(0);
    const isShow = common_vendor.ref(true);
    const search = () => {
      let value = searchValue.value;
      searchValue.value = "";
      searchHistory.value.unshift(value);
      if (searchHistory.value.length > 7) {
        searchHistory.value.pop();
      }
      common_vendor.index.setStorageSync("searchHistory", searchHistory.value);
      if (choiceType.value == searchType[2].value) {
        common_vendor.index.navigateTo({
          url: "/page-service/list?keyword=" + value
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/page-service/web-view?keyword=" + value + "&strSearchType=" + choiceType.value
        });
      }
    };
    const isShowNext = (e) => {
      if (e == 0) {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    };
    let list = [
      {
        bibId: "mc5101f524146ee1dff259c41c29b9c68",
        rank: 6,
        hotValue: 8,
        isOpen: 1,
        pub_year: "2018",
        author: "刘伟成著",
        callno: null,
        isbn: "9787307199149",
        publisher: "武汉大学出版社",
        bibNo: "1801333133",
        _id: "285942",
        title: "数字信息资源检索"
      },
      {
        title: "耐火材料学"
      },
      {
        title: "平凡的世界"
      },
      {
        title: "毛泽东选集"
      }
    ];
    list.forEach((item) => {
      collectionHotWord.push(item.title);
    });
    const searchHot = (item) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(isShowNext),
        b: common_vendor.o(($event) => choiceType.value = $event),
        c: common_vendor.p({
          clear: false,
          placeholder: "馆藏目录",
          localdata: common_vendor.unref(searchType),
          modelValue: choiceType.value
        }),
        d: common_vendor.o(($event) => choiceType.value = $event),
        e: common_vendor.p({
          clear: false,
          placeholder: "馆藏目录",
          localdata: common_vendor.unref(searchType)[0].array,
          modelValue: choiceType.value
        }),
        f: isShow.value,
        g: common_vendor.o(search),
        h: common_vendor.o(($event) => searchValue.value = $event),
        i: common_vendor.p({
          placeholder: "搜索书名,作者,分类,ISBN",
          radius: 100,
          clearButton: false,
          cancelButton: false,
          modelValue: searchValue.value
        }),
        j: common_vendor.f(common_vendor.unref(searchHistory), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => searchHot(), index)
          };
        }),
        k: common_vendor.p({
          title: "检索历史",
          margin: "0px"
        }),
        l: common_vendor.f(common_vendor.unref(collectionHotWord), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => searchHot(), index)
          };
        }),
        m: common_vendor.p({
          title: "热门检索",
          margin: "0px",
          thumbnail: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        }),
        n: common_vendor.p({
          title: "大家都在看",
          margin: "0px",
          thumbnail: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0296aeab"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-service/search.vue"]]);
wx.createPage(MiniProgramPage);
