"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "web-view",
  setup(__props) {
    const goToLink = common_vendor.ref("");
    const goTo = (value) => {
      console.log(value);
      if (value.strSearchType == "1") {
        goToLink.value = "https://libsys.wust.edu.cn/mspace/database?searchWord=" + value.keyword;
      } else if (value.strSearchType == "0") {
        goToLink.value = "https://libsys.wust.edu.cn/space/searchList?strSearchType=" + value + "&strText=" + value.keyword;
      } else
        ;
    };
    common_vendor.onLoad((e) => {
      if (e) {
        goTo(e);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: goToLink.value
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/pages/web-view.vue"]]);
wx.createPage(MiniProgramPage);
