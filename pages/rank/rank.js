import Rank from '../../model/Rank'
const rank = new Rank()

const app = getApp()
Page({
  data: {
    rankType: 0,
    rank: {
      rank: '',
      score: 0,
      list: []
    },
    bgImg: null
  },

  onLoad: function (options) {
    this._onLoad()

    this.setData({
      bgImg: app.globalData.file.base_img
    })
  },

  _onLoad: function () {
    this._getRank()
  },

  _getRank: function () {
    rank.getRank(this.data.rankType,(res) => {
      this.setData({
        rank: res.data
      })
    })
  },

  _rankTypeChange(e){
    let type = rank.getDataSet(e,'type')
    this.setData({
      rankType: type
    })
    this._getRank()
  }
})