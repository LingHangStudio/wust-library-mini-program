"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "subscribe",
  setup(__props) {
    common_vendor.index.getStorageSync("user");
    const lists = common_vendor.ref([
      {
        id: "123",
        name: "平凡的世界",
        pubilsh: "2012",
        ISBN: "978-7-5302",
        writer: "路遥",
        search: "I247.57"
      },
      {
        id: "123",
        name: "平凡的世界",
        pubilsh: "2012",
        ISBN: "978-7-5302",
        writer: "路遥",
        search: "I247.57"
      },
      {
        id: "123",
        name: "平凡的世界",
        pubilsh: "2012",
        ISBN: "978-7-5302",
        writer: "路遥",
        search: "I247.57"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(lists.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.search),
            c: common_vendor.t(item.ISBN),
            d: common_vendor.t(item.pubilsh),
            e: index
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-adc39c06"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-center/subscribe.vue"]]);
wx.createPage(MiniProgramPage);
