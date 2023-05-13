"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "foreign-webview",
  setup(__props) {
    const goToLink = common_vendor.ref("");
    const goTo = (value) => {
      goToLink.value = "https://libsys.wust.edu.cn/space/reader/readerHome";
    };
    common_vendor.onLoad((e) => {
      if (e) {
        goTo();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: goToLink.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/page-service/foreign-webview.vue"]]);
wx.createPage(MiniProgramPage);
