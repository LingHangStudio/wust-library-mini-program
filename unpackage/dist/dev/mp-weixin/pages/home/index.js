"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_group2 + _easycom_uni_section2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_card + _easycom_uni_group + _easycom_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const menu = [
      {
        id: "",
        name: "我的借阅",
        url: "",
        icon: "calendar"
      },
      {
        id: "",
        name: "我的预约",
        url: "",
        icon: "star-filled"
      },
      {
        id: "",
        name: "智能答疑",
        url: "/page-home/consult",
        icon: "chatboxes-filled"
      },
      {
        id: "",
        name: "预约服务",
        url: "",
        icon: "paperplane"
      },
      {
        id: "",
        name: "馆藏分布",
        url: "/page-service/inner?id=40",
        icon: "location-filled"
      },
      {
        id: "",
        name: "标签",
        url: "",
        icon: "flag"
      },
      {
        id: "",
        name: "关于",
        url: "",
        icon: "flag"
      }
    ];
    const bannerList = common_vendor.ref([]);
    const recommendList = common_vendor.ref([
      {
        address: null,
        browse: 83,
        categoryId: 50,
        createdAt: "2023-02-22T08:59:45.000Z",
        description: null,
        endTime: null,
        followCateName: "试用资源",
        href: "",
        id: 51730,
        publisher: "admin",
        showTitle: 1,
        speaker: null,
        startTime: null,
        tag: "",
        title: "IGI Global e-Book Collection试用通知"
      },
      {
        address: null,
        browse: 83,
        categoryId: 50,
        createdAt: "2023-02-22T08:59:45.000Z",
        description: null,
        endTime: null,
        followCateName: "试用资源",
        href: "",
        id: 51730,
        publisher: "admin",
        showTitle: 1,
        speaker: null,
        startTime: null,
        tag: "",
        title: "IGI Global e-Book Collection试用通知"
      },
      {
        address: null,
        browse: 83,
        categoryId: 50,
        createdAt: "2023-02-22T08:59:45.000Z",
        description: null,
        endTime: null,
        followCateName: "试用资源",
        href: "",
        id: 51730,
        publisher: "admin",
        showTitle: 1,
        speaker: null,
        startTime: null,
        tag: "",
        title: "IGI Global e-Book Collection试用通知"
      }
    ]);
    async function getBanner() {
      const res = await api_api.banner();
      bannerList.value = res.data;
    }
    const search = () => {
    };
    async function recommend() {
      const res = await api_api.getDisciplineCate();
      console.log("推荐");
      console.log(res);
    }
    const goTo = (url) => {
      console.log(url);
      common_vendor.index.navigateTo({
        url
      });
    };
    const goToInner = (id) => {
      common_vendor.index.navigateTo({
        url: "/page-service/inner?id=" + id
      });
    };
    common_vendor.onMounted(() => {
      getBanner();
      recommend();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => goTo("/page-service/search")),
        b: common_vendor.o(search),
        c: common_vendor.o(($event) => searchValue.value = $event),
        d: common_vendor.p({
          cancelButton: "none",
          placeholder: "搜索书名,作者,分类,IBSN",
          radius: 100,
          modelValue: searchValue.value
        }),
        e: common_vendor.f(bannerList.value, (item, index, i0) => {
          return {
            a: item.url,
            b: index
          };
        }),
        f: common_vendor.f(menu, (item, index, i0) => {
          return {
            a: "4978fed5-2-" + i0 + ",4978fed5-1",
            b: common_vendor.p({
              type: item.icon,
              size: "60"
            }),
            c: common_vendor.t(item.name),
            d: common_vendor.o(($event) => goTo(item.url)),
            e: common_vendor.o(($event) => goTo(item.url)),
            f: index,
            g: common_vendor.n("nav-li bg-index" + (index + 1))
          };
        }),
        g: common_vendor.p({
          margin: "30px 1px 30px 1px",
          padding: "1px",
          spacing: "1px"
        }),
        h: common_vendor.f(recommendList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: "4978fed5-6-" + i0 + ",4978fed5-5",
            c: common_vendor.o(($event) => goToInner(item.id), index),
            d: index
          };
        }),
        i: common_vendor.p({
          ["is-full"]: true
        }),
        j: common_vendor.p({
          title: "为您推荐",
          type: "line"
        }),
        k: common_vendor.p({
          margin: "10px 8px 5px 8px",
          padding: "0px"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "C:/Users/31986/wust-library-miniprogram/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
