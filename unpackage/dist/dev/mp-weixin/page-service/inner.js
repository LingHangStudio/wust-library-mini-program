"use strict";
const common_vendor = require("../common/vendor.js");
const api_api = require("../api/api.js");
require("../api/request.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "inner",
  setup(__props) {
    const id = common_vendor.ref();
    const article = common_vendor.ref({
      address: "",
      browse: "",
      categoryId: "",
      content: "",
      title: "",
      createdAt: [],
      publisher: ""
    });
    common_vendor.onLoad((e) => {
      id.value = e;
      getArticle(e);
    });
    async function getArticle(id2) {
      const res = await api_api.getArticleContent(id2);
      console.log(res);
      article.value = res.data;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: article.value.showTitle
      }, article.value.showTitle ? {
        b: common_vendor.t(article.value.publisher),
        c: common_vendor.t(article.value.browse)
      } : {}, {
        d: article.value.content,
        e: common_vendor.p({
          title: article.value.title,
          margin: "6px",
          extra: article.value.createdAt.slice(0, 10)
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b0546870"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-service/inner.vue"]]);
wx.createPage(MiniProgramPage);
