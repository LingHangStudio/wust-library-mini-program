"use strict";
const api_request = require("./request.js");
function banner() {
  return api_request.request({
    url: "/banner/list1",
    method: "GET"
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
function getArticleList(data) {
  return api_request.request({
    url: "/article/list",
    method: "GET",
    data
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
function searchArticle(data) {
  return api_request.request({
    url: "/article/search",
    method: "GET",
    data
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
function getArticleContent(data) {
  console.log("id", data);
  return api_request.request({
    url: "/article/index",
    method: "GET",
    data
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
function getDisciplineCate() {
  return api_request.request({
    url: "/recommend/discipline",
    method: "GET"
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    console.log(err);
  });
}
exports.banner = banner;
exports.getArticleContent = getArticleContent;
exports.getArticleList = getArticleList;
exports.getDisciplineCate = getDisciplineCate;
exports.searchArticle = searchArticle;
