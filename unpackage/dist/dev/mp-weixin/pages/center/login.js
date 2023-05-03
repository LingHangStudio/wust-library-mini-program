"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const userForm = common_vendor.ref({
      username: "as",
      password: "dasd"
    });
    function login() {
      common_vendor.index.setStorageSync("user", userForm.value);
      common_vendor.index.switchTab({
        url: "/pages/home/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => userForm.value.username = $event),
        c: common_vendor.p({
          inputBorder: false,
          maxlength: "13",
          prefixIcon: "person-filled",
          type: "text",
          placeholder: "请输入学号",
          modelValue: userForm.value.username
        }),
        d: common_vendor.o(($event) => userForm.value.password = $event),
        e: common_vendor.p({
          inputBorder: false,
          prefixIcon: "locked",
          type: "password",
          placeholder: "请输入密码",
          modelValue: userForm.value.password
        }),
        f: common_vendor.o(() => {
        }),
        g: common_vendor.o(login)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0df2198"], ["__file", "C:/Users/31986/wust-library-miniprogram/pages/center/login.vue"]]);
wx.createPage(MiniProgramPage);
