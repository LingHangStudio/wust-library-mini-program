"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_segmented_control2 + _easycom_uni_tag2 + _easycom_uni_card2 + _easycom_uni_icons2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_tag + _easycom_uni_card + _easycom_uni_icons)();
}
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const items = common_vendor.ref(["全部", "讲座", "培训", "阅读活动"]);
    const readList = common_vendor.ref([]);
    const readArticle = common_vendor.ref("");
    const lectureList = common_vendor.ref([]);
    const lectureArticle = common_vendor.ref("");
    const trainList = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    const all = common_vendor.ref([]);
    const showList = common_vendor.ref([]);
    const toBottom = common_vendor.ref(false);
    const onClickItem = (e) => {
      if (current.value != e.currentIndex) {
        current.value = e.currentIndex;
        if (e.currentIndex == 0) {
          showList.value = all.value;
        } else if (e.currentIndex == 2) {
          showList.value = trainList.value;
        }
      }
    };
    async function getArticle() {
      const res1 = await api_api.getArticleList({
        categoryId: 39
      });
      lectureList.value = res1.data;
      const res2 = await api_api.getArticleContent({
        id: "52"
      });
      lectureArticle.value = res2.data;
      const res3 = await api_api.getArticleList({
        categoryId: 37
      });
      console.log("培训列表", res3);
      trainList.value = res3.data;
      Array.prototype.push.apply(all.value, res3.data);
      const res4 = await api_api.getArticleContent({
        id: "22"
      });
      readArticle.value = res4.data;
      const test = await api_api.getArticleList({
        categoryId: 40
      });
      Array.prototype.push.apply(all.value, test.data);
      showList.value = all.value;
    }
    getArticle();
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
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items.value
        }),
        c: current.value === 0 || current.value === 2
      }, current.value === 0 || current.value === 2 ? {
        d: common_vendor.f(showList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.createdAt),
            c: "2c61ebca-2-" + i0 + "," + ("2c61ebca-1-" + i0),
            d: common_vendor.p({
              text: item.tag,
              type: "primary",
              circle: true
            }),
            e: "2c61ebca-1-" + i0,
            f: index
          };
        }),
        e: common_vendor.p({
          margin: "3px",
          padding: "3px",
          ["is-full"]: true
        })
      } : {}, {
        f: current.value === 1
      }, current.value === 1 ? {
        g: lectureArticle.value.content
      } : {}, {
        h: current.value === 3
      }, current.value === 3 ? {
        i: readArticle.value.content,
        j: common_vendor.f(readList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title)
          };
        })
      } : {}, {
        k: current.value === 0 || current.value === 2
      }, current.value === 0 || current.value === 2 ? {} : {}, {
        l: common_vendor.p({
          type: "top",
          size: "30px"
        }),
        m: common_vendor.o(toTop),
        n: toBottom.value
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 1;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-2c61ebca"], ["__file", "C:/Users/31986/wust-library-miniprogram/pages/activity/index.vue"]]);
wx.createPage(MiniProgramPage);
