"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: ["showLoginBtn"],
  data() {
    return {};
  },
  methods: {
    getUserProfile(e) {
      common_vendor.index.getUserProfile({
        desc: "用于完善用户信息",
        success: (res) => {
          let userInfo = res.userInfo;
          console.log(userInfo);
          this.userInfo = userInfo;
          this.notlogin = false;
          this.$api.postUserInfo(userInfo);
          this.$store.dispatch("setUserInfo", userInfo);
          common_vendor.index.setStorageSync("userInfo", userInfo);
          this.$emit("hideHello");
        },
        fail: (res) => {
          this.$emit("hideHello");
          console.log("用户信息获取失败");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.showLoginBtn
  }, !$props.showLoginBtn ? {} : {}, {
    b: !$props.showLoginBtn
  }, !$props.showLoginBtn ? {} : {}, {
    c: !$props.showLoginBtn
  }, !$props.showLoginBtn ? {} : {}, {
    d: $props.showLoginBtn
  }, $props.showLoginBtn ? {} : {}, {
    e: $props.showLoginBtn
  }, $props.showLoginBtn ? {
    f: common_vendor.o((...args) => $options.getUserProfile && $options.getUserProfile(...args))
  } : {}, {
    g: $props.showLoginBtn
  }, $props.showLoginBtn ? {} : {}, {
    h: !$props.showLoginBtn
  }, !$props.showLoginBtn ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fde61fb9"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-home/hello.vue"]]);
wx.createPage(MiniProgramPage);
