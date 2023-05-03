"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://59.68.177.141/api/server";
function request(options) {
  common_vendor.index.showLoading({
    title: "数据加载中"
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      // 开发者服务器接口地址（请求服务器地址 + 具体接口名）
      url: BASE_URL + options.url,
      // 请求方式（若不传，则默认为 GET ）
      method: options.method || "GET",
      // 请求参数（若不传，则默认为 {} ）
      data: options.data || {},
      header: options.header,
      // 请求成功
      success: (res) => {
        console.log("总res", res);
        if (res.data.code !== 200) {
          common_vendor.index.showToast({
            title: "获取数据失败！",
            icon: "error"
          });
          reject(res.data.message);
        }
        resolve(res);
      },
      // 请求失败
      fail: (err) => {
        console.log("总err", err);
        common_vendor.index.showToast({
          title: "请求接口失败！",
          icon: "error"
        });
        reject(err);
      },
      //请求结束之后，执行的回调函数（成功或失败都会执行）
      complete() {
        common_vendor.index.hideLoading();
      }
    });
  });
}
exports.request = request;
