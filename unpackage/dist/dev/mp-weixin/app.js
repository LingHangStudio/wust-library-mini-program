"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const router_permission = require("./router/permission.js");
require("./router/auth.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/activity/index.js";
  "./pages/resources/index.js";
  "./pages/center/index.js";
  "./page-home/consult.js";
  "./page-home/hello.js";
  "./page-service/search-webview.js";
  "./page-service/foreign-webview.js";
  "./page-service/search.js";
  "./page-service/inner.js";
  "./page-service/list.js";
  "./page-service/test.js";
  "./page-center/login.js";
  "./page-center/aboutMe.js";
  "./page-center/subscribe.js";
  "./page-center/feedback.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      router_permission.routingIntercept();
      console.log("App Launch");
      if (common_vendor.index.getStorageSync("WechatToken")) {
        console.log("微信以授权");
      }
      common_vendor.index.getSetting({
        success(res) {
          console.log(res);
          if (res.authSetting["scope.userInfo"]) {
            common_vendor.index.getUserInfo({
              success(res2) {
                console.log(res2.userInfo);
                setTimeout(() => {
                  common_vendor.index.setStorageSync("WechatToken", res2.encryptedData);
                }, 1e3);
                console.log("获取信息成功");
              },
              fail() {
                console.log("获取用户信息失败");
              }
            });
          } else if (!res.authSetting["scope.userInfo"]) {
            common_vendor.index.navigateTo({
              url: "/page-home/hello"
            });
            console.log("需要点击按钮手动授权");
          }
        },
        fail() {
          console.log("获取已授权选项失败");
        }
      });
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/31986/wust-library-miniprogram/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
