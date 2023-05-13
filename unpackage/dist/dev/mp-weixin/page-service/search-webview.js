"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search-webview",
  setup(__props) {
    const goToLink = common_vendor.ref("");
    const goTo = (value) => {
      console.log(value);
      if (value.strSearchType1 == "1") {
        goToLink.value = "https://libsys.wust.edu.cn/mspace/database/1?searchWord=" + value.keyword;
      } else if (value.strSearchType2 == "0") {
        let type = "titles";
        switch (value.strSearchType1) {
          case "0":
            type = "titles";
            break;
          case "1":
            type = "authors";
            break;
          case "2":
            type = "subjects";
            break;
          case "3":
            type = "series";
            break;
        }
        console.log("https://libsys.wust.edu.cn/space/searchList?strSearchType=" + type + "&strText=" + value.keyword);
        goToLink.value = "https://libsys.wust.edu.cn/space/searchList?strSearchType=" + type + "&strText=" + value.keyword;
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/page-service/search-webview.vue"]]);
wx.createPage(MiniProgramPage);
