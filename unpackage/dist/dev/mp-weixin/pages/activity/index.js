"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  _easycom_uni_segmented_control2();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  _easycom_uni_segmented_control();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const items = common_vendor.ref(["讲座", "培训", "阅读活动"]);
    const current = common_vendor.ref(0);
    const onClickItem = (e) => {
      if (current.value != e.currentIndex)
        current.value = e.currentIndex;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items.value
        }),
        c: current.value === 0
      }, current.value === 0 ? {} : {}, {
        d: current.value === 1
      }, current.value === 1 ? {} : {}, {
        e: current.value === 2
      }, current.value === 2 ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/pages/activity/index.vue"]]);
wx.createPage(MiniProgramPage);
