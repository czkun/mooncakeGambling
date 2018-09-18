import PlayDice from '../../model/PlayDice'
const playDice = new PlayDice()

const app = getApp()
Page({
  data: {
    // 博饼可用次数
    count: 0,
    // 博饼状态  0：未开始  1：博饼中 2：结果
    playStatus: 0,
    // 禁用
    disabled: false,

    // 次数用完弹窗
    finishHide: true,
    // 可分享次数
    share: 0,

    // 背景图片
    bgImg: null,
    // 背景音乐是否播放
    musicPlay: true,

    // 骰子图片地址
    dices: [
      '../../imgs/playDice.gif',
      '../../imgs/dice1.png',
      '../../imgs/dice2.png',
      '../../imgs/dice3.png',
      '../../imgs/dice4.png',
      '../../imgs/dice5.png',
      '../../imgs/dice6.png',
    ],
    // 博饼结果
    diceList: [
      '../../imgs/dice1.png',
      '../../imgs/dice2.png',
      '../../imgs/dice3.png',
      '../../imgs/dice4.png',
      '../../imgs/dice5.png',
      '../../imgs/dice6.png',
    ],
    result: {
      result:{
        name:'一秀',
        score: 0
      }
    }
  },

  // 分享
  onShareAppMessage: function (res) {
    let code = wx.getStorageSync('shareCode')
    return {
      title: '中秋博饼',
      path: '/pages/index/index?code=' + code,
      imageUrl: app.globalData.file.index_img,
      success: function () {
      }
    }
  },

  onLoad: function () {
    this._onLoad()
    this._shake()

    app.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.setData({
      bgImg: app.globalData.file.base_img,
      musicPlay: wx.getStorageSync('musicPlay'),
      disabled: false
    })
  },

  onUnload: function() {
    this.setData({
      disabled: true
    })
  },

  _onLoad: function () {
    playDice.getDice((res) => {
      this.setData({
        count: res.data.dice
      })
    })
  },

  // 摇一摇
  _shake(){
    let that = this
    wx.onAccelerometerChange(function (e) {
      if (e.x > 0.1 && e.y > 0.3 && !that.data.disabled) {
        that._play()
      }
    })
  },

  // 博饼
  _play: function () {
    if(this.data.disabled){
      return false;
    }

    if(!this.data.count){

      // 获取可分享次数
      playDice.getShare((res) => {
        this.setData({
          share: res.data.share
        })
      })
      this.setData({
        finishHide: false
      })
      return false
    }

    this.setData({
      disabled: true
    })
    playDice.playDice((res) => {
      if(res.status != 20000){
        this.setData({
          playStatus: 0,
          disabled: false
        })
        return;
      }
      let data = res.data
      let list = []
      for(let i = 0, len = data.dice.length; i < len; i++){
        list[i] = this.data.dices[data.dice[i]]
      }

      this.setData({
        result: data,
        diceList: list,
        count: this.data.count-1,
        'dices[0]': '../../imgs/playDice.gif',
        playStatus: 1
      })

      app.globalData.backgroundAudioManager.src = app.globalData.file.dice_music

      setTimeout(() => {
        this.setData({
          'dices[0]': '',
          playStatus: 2,
        })
        if(this.data.musicPlay){
          app.globalData.backgroundAudioManager.src = app.globalData.file.background_music
        }else{
          wx.pauseBackgroundAudio()
        }
      },2700)
    })
  },

  // 关闭结果弹窗
  _closeResultPopup: function(){
    this.setData({
      playStatus: 0,
      disabled: false
    })
  },

  // 关闭次数用完弹窗
  _closeFinishPopup: function () {
    this.setData({
      finishHide: true
    })
  }
})