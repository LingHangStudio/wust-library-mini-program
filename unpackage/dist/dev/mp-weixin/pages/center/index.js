"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_icons)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const user = common_vendor.index.getStorageSync("user");
    console.log(user);
    const menu = [
      {
        id: "",
        name: "搜索资源",
        url: "/pages/home/search",
        icon: "search",
        complete: "1"
      },
      {
        id: "",
        name: "绑定用户",
        url: "/pages/center/login",
        icon: "locked",
        complete: "1"
      },
      {
        id: "",
        name: "我的借阅",
        url: "",
        icon: "eye",
        complete: ""
      },
      {
        id: "",
        name: "我的预约",
        url: "",
        icon: "tune",
        complete: ""
      },
      {
        id: "",
        name: "我的收藏",
        url: "",
        icon: "folder-add",
        complete: ""
      },
      {
        id: "",
        name: "我的订阅",
        url: "",
        icon: "cloud-upload",
        complete: ""
      },
      {
        id: "",
        name: "关于我们",
        url: "",
        icon: "info",
        complete: ""
      },
      {
        id: "",
        name: "反馈意见",
        url: "",
        icon: "staff",
        complete: ""
      },
      {
        id: "",
        name: "退出登录",
        url: "",
        icon: "close",
        complete: ""
      },
      {
        id: "",
        name: "test",
        url: "/pages/test",
        icon: "",
        complete: ""
      }
    ];
    const goTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(user)
      }, common_vendor.unref(user) ? {
        b: common_assets._imports_0,
        c: common_vendor.t(common_vendor.unref(user).username)
      } : {}, {
        d: common_vendor.p({
          margin: "10px 0px 5px 0px",
          padding: "0px",
          spacing: "0px"
        }),
        e: common_vendor.f(menu, (item, index, i0) => {
          return common_vendor.e({
            a: "b067d044-2-" + i0 + ",b067d044-1",
            b: common_vendor.p({
              type: item.icon,
              size: "40"
            }),
            c: common_vendor.t(item.name),
            d: item.complete
          }, item.complete ? {} : {}, {
            e: common_vendor.o(($event) => goTo(item.url), index),
            f: index
          });
        }),
        f: common_vendor.p({
          title: ""
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/pages/center/index.vue"]]);
wx.createPage(MiniProgramPage);
