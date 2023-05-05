"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_rate2 + _easycom_uni_card2)();
}
const _easycom_uni_rate = () => "../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_card = () => "../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_card)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "feedback",
  setup(__props) {
    const score = common_vendor.ref();
    const feedBack = common_vendor.ref("");
    const onChange = (e) => {
      score.value = e.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onChange),
        b: common_vendor.o(($event) => score.value = $event),
        c: common_vendor.p({
          modelValue: score.value
        }),
        d: feedBack.value,
        e: common_vendor.p({
          title: "对本馆的评价"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/page-center/feedback.vue"]]);
wx.createPage(MiniProgramPage);
