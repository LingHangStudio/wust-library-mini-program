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
  "./page-service/web-view.js";
  "./page-service/search.js";
  "./page-service/inner.js";
  "./page-service/list.js";
  "./page-service/test.js";
  "./page-center/login.js";
  "./page-center/aboutMe.js";
  "./page-center/feedback.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      router_permission.routingIntercept();
      console.log("App Launch");
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
