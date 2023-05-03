"use strict";
const api_request = require("./request.js");
function searchQuestion(data) {
  return api_request.request({
    url: "/web/msg/question",
    method: "POST",
    data
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
exports.searchQuestion = searchQuestion;
