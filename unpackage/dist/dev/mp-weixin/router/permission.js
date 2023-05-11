"use strict";
const common_vendor = require("../common/vendor.js");
const router_auth = require("./auth.js");
const whiteList = [
  "/",
  "/pages/home/index",
  "/page-center/login"
];
async function routingIntercept() {
  const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    common_vendor.index.addInterceptor(item, {
      invoke(e) {
        const url = e.url.split("?")[0];
        console.log("url", url);
        let pass;
        if (whiteList) {
          pass = whiteList.some((item2) => {
            if (typeof item2 === "object" && item2.pattern) {
              return item2.pattern.test(url);
            }
            return url === item2;
          });
        }
        if (!pass && !router_auth.getAuthorization()) {
          common_vendor.index.showToast({
            title: "请先登录",
            icon: "error"
          });
          common_vendor.index.navigateTo({
            url: "/page-center/login"
          });
          return false;
        }
        return e;
      },
      fail(err) {
        console.log(err);
      }
    });
  });
}
exports.routingIntercept = routingIntercept;
