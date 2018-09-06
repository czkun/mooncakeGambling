import Base from '../../model/Base.js'
const base = new Base()

import BindMobile from '../../model/BindMobile.js'
const bindMobile = new BindMobile()

import User from '../../model/User'
const user = new User()

import File from '../../model/File.js'
const file = new File()

import validate from '../../utils/validate.js'

const app = getApp()
Page({
  data: {
    /* 数据 */
    mobile: null,
    code: null,

    /* 控制 */

    //音乐播放
    musicPlay: true,
    backgroundMusic: null,
    musicAnimation: null,

    // 背景图片
    bgImg: null,

    // 授权获取信息
    scopeUserInfo: false,
    // 是否绑定手机号
    isBindMobile: true,

    // 验证码
    codeState: true,
    codeTime: 60,
    codeText: '获取验证码',
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '中秋博饼',
      path: '/pages/index/index',
      imageUrl: app.globalData.file.index_img,
      success: function () {
        playDice.share()
      }
    }
  },

  onLoad: function () {
    this._getFile()
    this._onLoad()
  },

  _onLoad: function () {
    // 判断有没有Token
    if(!wx.getStorageSync('token')){
      base.getToken((res) => {
        if(res.status === 10003){
          wx.setStorageSync('isBindMobile', false)
          this.setData({
            isBindMobile: false
          })
        }else{
          this._updateInfo()
        }
      })
    }else{
      this._updateInfo()
    }

    // 判断有没有绑定手机号
    if(wx.getStorageSync('isBindMobile') === false){
      this.setData({
        isBindMobile: false
      })
    }
  },

  /* 获取文件地址 */
  _getFile: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    file.getFile((res) => {
      console.log(res.data)
      app.globalData.file = res.data
      wx.hideLoading()

      this.setData({
        bgImg: app.globalData.file.index_img
      })
      this._initMusic();
    })
  },

  // 初始化音乐
  _initMusic: function(){
    // 获取背景音乐播放状态
    let musicPlay = wx.getStorageSync('musicPlay')
    if(musicPlay != null){
      this.setData({
        musicPlay: musicPlay
      })
    }

    this._muiscPlay()
  },

  // 音乐播放切换
  _musicPlayChange: function(){
    this.setData({
      musicPlay: !this.data.musicPlay
    })
    wx.setStorageSync('musicPlay', this.data.musicPlay)
    this._muiscPlay()
  },

  // 音乐播放
  _muiscPlay: function(){
    let that = this
    if(that.data.musicPlay){
      app.globalData.backgroundAudioManager.src = app.globalData.file.background_music
    }else {
      app.globalData.backgroundAudioManager.pause()
    }
  },

  /* 更新用户信息 */
  _updateInfo: function(){
    // 查看是否授权
    let that = this
    wx.getSetting({
      success: function(res){
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          
          wx.getUserInfo({
            success: function(res) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              that.setData({
                scopeUserInfo: false
              })
              user.updateInfo(res.userInfo.nickName, res.userInfo.avatarUrl)
            }
          })
        }else {
          that.setData({
            scopeUserInfo: true
          })
        }
      }
    })
  },

  _mobileInput(e){
    /*this.setData({
      codeState: true,
      codeText: '获取验证码',
    })*/
    this._input(e)
  },

  _input(e){
    bindMobile.iptChange(e, this)
  },

  /* 获取验证码 */
  _getCode(){
    if (this.data.codeState){
      let mobile = this.data.mobile
      if (validate.mobile(mobile)) {
        bindMobile.getSmsCode(mobile, (res) => {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 3000
          })
          this._countdown()
        })
      }
    }
  },

  /* 倒计时 */
  _countdown(){
    this.setData({
      codeState: false
    })
    this._time(this.data.codeTime)
  },

  _time(time){
    var that = this
    setTimeout(function(){
      if(time > 0){
        time--
        that.setData({
          codeText: time + 's重新发送'
        })
        that._time(time)
      }else{
        that.setData({
          codeState: true,
          codeText: '重新获取'
        })
      }
    },1000)
  },

  /* 绑定手机号 */
  _bindMobile(){
    bindMobile.bindMobile(this.data.mobile, this.data.code, (res) => {
      console.log(res);
      if (res.status == 20000){
        wx.setStorageSync('isBindMobile', true)
        this.setData({
          isBindMobile: true
        })
        this._updateInfo();
      }
    })
  }
})
