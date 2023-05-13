"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const wechatUser = common_vendor.index.getStorageSync("WechatUser");
    const menu = [
      {
        id: "",
        name: "绑定用户",
        url: "/page-center/login",
        icon: "locked",
        inner: true,
        complete: "1"
      },
      {
        id: "",
        name: "我的借阅",
        url: "/page-service/foreign-webview",
        inner: false,
        icon: "eye",
        complete: "1"
      },
      {
        id: "",
        name: "我的预约",
        url: "",
        inner: false,
        icon: "tune",
        complete: ""
      },
      {
        id: "",
        name: "我的收藏",
        url: "",
        inner: false,
        icon: "folder-add",
        complete: ""
      },
      {
        id: "",
        name: "关于我们",
        url: "/page-center/aboutMe",
        icon: "info",
        inner: true,
        complete: "1"
      },
      {
        id: "",
        name: "反馈意见",
        url: "/page-center/feedback",
        icon: "staff",
        inner: true,
        complete: "1"
      },
      {
        id: "",
        name: "test",
        url: "/page-service/test",
        icon: "",
        inner: true,
        complete: "1"
      }
    ];
    const goTo = (item) => {
      if (item.inner) {
        common_vendor.index.navigateTo({
          url: item.url
        });
      } else {
        common_vendor.index.navigateTo({
          url: item.url
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(user)
      }, common_vendor.unref(user) ? common_vendor.e({
        b: common_vendor.unref(wechatUser).avatarUrl,
        c: common_vendor.unref(user).username
      }, common_vendor.unref(user).username ? {
        d: common_vendor.t(common_vendor.unref(user).username)
      } : {
        e: common_vendor.t(common_vendor.unref(wechatUser).nickName)
      }) : {}, {
        f: common_vendor.p({
          margin: "10px 0px 5px 0px",
          padding: "0px",
          spacing: "0px"
        }),
        g: common_vendor.f(menu, (item, index, i0) => {
          return common_vendor.e({
            a: "b067d044-2-" + i0 + ",b067d044-1",
            b: common_vendor.p({
              type: item.icon,
              size: "40"
            }),
            c: common_vendor.t(item.name),
            d: item.complete
          }, item.complete ? {
            e: "b067d044-3-" + i0 + ",b067d044-1",
            f: common_vendor.p({
              type: "forward"
            })
          } : {}, {
            g: common_vendor.o(($event) => goTo(item), index),
            h: index
          });
        }),
        h: common_vendor.p({
          title: ""
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/pages/center/index.vue"]]);
wx.createPage(MiniProgramPage);
