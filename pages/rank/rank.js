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
    bgImg: null,
    logoList: [],
    swiperIndex: 1,
  },

  onLoad: function (options) {
    this._onLoad()

    this.setData({
      bgImg: app.globalData.file.base_img,
      logoList: app.globalData.file.logo_list
    })
  },

  _onLoad: function () {
    this._getRank()
  },

  // 获取排行版
  _getRank: function () {
    rank.getRank(this.data.rankType,(res) => {
      this.setData({
        rank: res.data
      })
    })
  },

  // 排行榜切换
  _rankTypeChange(e){
    let type = rank.getDataSet(e,'type')
    this.setData({
      rankType: type
    })
    this._getRank()
  },

  _swiperChange(e){
    let len = this.data.logoList.length
    let index = (e.detail.current+1)%len
    this.setData({
      swiperIndex: index
    })
  }
})