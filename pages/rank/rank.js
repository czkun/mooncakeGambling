import Rank from '../../model/Rank'
const rank = new Rank()

const app = getApp()
Page({
  data: {
    list: null,
    selfRank: 0,
    bgImg: null
  },

  onLoad: function (options) {
    this._onLoad()

    this.setData({
      bgImg: app.globalData.file.base_img
    })
  },

  _onLoad: function () {
    rank.getSelfRank((res) => {
      this.setData({
        selfRank: res.data.rank
      })
      rank.getRank((res) => {
        this.setData({
          list: res.data.list
        })
      })
    })
  }
})