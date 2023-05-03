"use strict";
const common_vendor = require("../common/vendor.js");
const authorizationKey = "user";
function getAuthorization() {
  return common_vendor.index.getStorageSync(authorizationKey);
}
exports.getAuthorization = getAuthorization;
