"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_notice_bar2 + _easycom_uni_segmented_control2 + _easycom_uni_card2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_segmented_control + _easycom_uni_card)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const items = common_vendor.ref(["最新资源", "最新消息"]);
    const current = common_vendor.ref(0);
    const noticeList = common_vendor.ref([]);
    const reourseList = common_vendor.ref([]);
    common_vendor.ref(0);
    const onClickItem = (e) => {
      if (current.value != e.currentIndex)
        current.value = e.currentIndex;
    };
    async function getArticle() {
      const res1 = await api_api.getArticleList({
        categoryId: 30
      });
      noticeList.value = res1.data;
      const res2 = await api_api.getArticleList({
        categoryId: 46
      });
      console.log(res2);
      reourseList.value = res2.data;
    }
    const goTo = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/service/inner?id=" + id
      });
    };
    common_vendor.onMounted(() => {
      getArticle();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["show-icon"]: true,
          text: "最新消息!"
        }),
        b: common_vendor.o(onClickItem),
        c: common_vendor.p({
          current: current.value,
          values: items.value
        }),
        d: current.value === 0
      }, current.value === 0 ? {
        e: common_vendor.f(reourseList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "bd941a4b-2-" + i0,
            c: common_vendor.o(($event) => goTo(item.id), index),
            d: index
          };
        }),
        f: common_vendor.p({
          ["is-full"]: true
        })
      } : {}, {
        g: current.value === 1
      }, current.value === 1 ? {
        h: common_vendor.f(noticeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "bd941a4b-3-" + i0,
            c: common_vendor.o(($event) => goTo(item.id), index),
            d: index
          };
        }),
        i: common_vendor.p({
          ["is-full"]: true
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd941a4b"], ["__file", "C:/Users/31986/wust-library-miniprogram/pages/resources/index.vue"]]);
wx.createPage(MiniProgramPage);
