// pages/rule/rule.js
const app = getApp()
Page({

  data: {
    bgImg: null
  },

  onLoad: function (options) {
    this.setData({
      bgImg: app.globalData.file.rule_img
    })
  },

})