"use strict";
const common_vendor = require("../common/vendor.js");
const api_consult = require("../api/consult.js");
require("../api/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_easyinput2 + _easycom_uni_card2)();
}
const _easycom_uni_easyinput = () => "../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_card = () => "../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_card)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "consult",
  setup(__props) {
    const hotList = common_vendor.reactive([
      "图书馆什么时候开放？",
      "如何找到我想借的书",
      "图书馆咨询电话是多少？",
      "为什么要求读者登记Email或手机号码？"
    ]);
    const chatList = common_vendor.reactive([
      {
        id: 0,
        content: "您好,我是智能客服机器人小图,我可以回答您相关的业务问题,有什么问题就问我吧!很高兴为您服务!"
      }
    ]);
    const questionInput = common_vendor.ref("");
    let questionList = common_vendor.reactive([]);
    const commonSearch = (item) => {
      questionInput.value = item;
      searchQuestions();
    };
    async function searchQuestions() {
      chatList.push({
        id: 1,
        content: questionInput.value
      });
      let data = {
        msg: questionInput.value,
        userId: ""
      };
      const res = await api_consult.searchQuestion(data);
      console.log(res);
      if (res) {
        questionList = res.data;
        questionInput.value = "";
      } else {
        questionInput.value = "";
        chatList.push({
          id: 2,
          content: "您的问题超出了小图的理解能力喔 ~ "
        });
      }
      if (questionList.length == 0)
        ;
      this.scrollBottom();
    }
    const seeQuestionDetail = (ele) => {
      chatList.push({
        id: 2,
        content: ele.answer
      });
      scrollBottom();
    };
    const scrollBottom = () => {
      let ele = document.getElementById("chatBody");
      if (ele.scrollHeight > ele.clientHeight) {
        setTimeout(function() {
          ele.scrollTop = ele.scrollHeight;
        }, 500);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(hotList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => commonSearch(item), index)
          };
        }),
        b: common_vendor.f(chatList, (item, index, i0) => {
          return common_vendor.e({
            a: !item.questionList
          }, !item.questionList ? {
            b: common_vendor.t(item.content)
          } : {}, {
            c: item.id == 2
          }, item.id == 2 ? {} : {}, {
            d: item.questionList
          }, item.questionList ? {
            e: common_vendor.f(item.questionList, (ele, k1, i1) => {
              return {
                a: common_vendor.t(ele.question),
                b: ele.id,
                c: common_vendor.o(($event) => seeQuestionDetail(ele), ele.id)
              };
            })
          } : {}, {
            f: index,
            g: common_vendor.n(item.id == 1 ? "chatQuestion" : "")
          });
        }),
        c: common_vendor.o(($event) => searchQuestions()),
        d: common_vendor.o(($event) => questionInput.value = $event),
        e: common_vendor.p({
          placeholder: "请输入咨询内容",
          modelValue: questionInput.value
        }),
        f: common_vendor.o(($event) => searchQuestions()),
        g: common_vendor.p({
          padding: "5px",
          margin: "0px"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-16e46d8a"], ["__file", "C:/Users/31986/wust-library-miniprogram/page-home/consult.vue"]]);
wx.createPage(MiniProgramPage);
