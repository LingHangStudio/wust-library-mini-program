"use strict";
const common_vendor = require("../common/vendor.js");
const api_api = require("../api/api.js");
require("../api/request.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    const searchInput = common_vendor.ref("");
    let searchList = common_vendor.reactive([]);
    const currentPage = common_vendor.ref(1);
    const pageNum = common_vendor.ref(10);
    const err = common_vendor.ref(false);
    common_vendor.onLoad((e) => {
      console.log(e);
      if (e) {
        searchInput.value = e.keyword;
      }
    });
    async function getSearch() {
      const res = await api_api.searchArticle({
        keyword: searchInput.value,
        currentPage,
        pageNum
      });
      if (res) {
        searchList = res.data;
      } else {
        err.value = true;
      }
    }
    async function getArticle() {
      const res = await api_api.getArticleList();
      console.log(res);
    }
    common_vendor.onMounted(() => {
      console.log(searchInput);
      if (searchInput.value) {
        console.log("我是搜索");
        getSearch();
      } else {
        console.log("我是文章列表");
        getArticle();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !err.value
      }, !err.value ? common_vendor.e({
        b: !common_vendor.unref(searchList)
      }, !common_vendor.unref(searchList) ? {} : {
        c: common_vendor.f(common_vendor.unref(searchList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: index
          };
        })
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb6ba72c"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-service/list.vue"]]);
wx.createPage(MiniProgramPage);
