"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_notice_bar2 + _easycom_uni_segmented_control2 + _easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_segmented_control + _easycom_uni_icons + _easycom_uni_card)();
}
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const items = common_vendor.ref(["最新资源", "最新消息"]);
    const current = common_vendor.ref(0);
    const noticeList = common_vendor.ref([]);
    const showList = common_vendor.ref([]);
    const reourseList = common_vendor.ref([]);
    common_vendor.ref(0);
    const toBottom = common_vendor.ref(false);
    const onClickItem = (e) => {
      if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
        showList.value = e.currentIndex == 0 ? reourseList.value : noticeList.value;
      }
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
      showList.value = res2.data;
    }
    const goTo = (id) => {
      common_vendor.index.navigateTo({
        url: "/page-service/inner?id=" + id
      });
    };
    common_vendor.onMounted(() => {
      getArticle();
    });
    common_vendor.onReachBottom(() => {
      toBottom.value = true;
    });
    common_vendor.onPageScroll((e) => {
      console.log();
    });
    const toTop = () => {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        // 滚动到页面的目标位置  这个是滚动到顶部, 0 
        duration: 300
        // 滚动动画的时长
      });
      toBottom.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          text: "最新消息: 暑假活动 | 共读打卡活动，等你来参加！"
        }),
        b: common_vendor.o(onClickItem),
        c: common_vendor.p({
          current: current.value,
          values: items.value
        }),
        d: common_vendor.f(showList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "bd941a4b-3-" + i0 + "," + ("bd941a4b-2-" + i0),
            c: common_vendor.t(item.browse),
            d: "bd941a4b-2-" + i0,
            e: common_vendor.o(($event) => goTo(item.id), index),
            f: index
          };
        }),
        e: common_vendor.p({
          type: "eye"
        }),
        f: common_vendor.p({
          margin: "3px",
          padding: "3px",
          ["is-full"]: true
        }),
        g: common_vendor.p({
          type: "top",
          size: "30px"
        }),
        h: common_vendor.o(toTop),
        i: toBottom.value
      };
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-bd941a4b"], ["__file", "C:/Users/31986/wust-library-miniprogram/pages/resources/index.vue"]]);
wx.createPage(MiniProgramPage);
