App({
  globalData: {
    file: null,
    backgroundAudioManager: null,
    updateManager: null
  },
  onLaunch: function () {
    this._creatBackgroundAudioManager()
    this._creatUpdateManager()
  },
  onShow: function(options) {
    if(wx.getStorageSync('musicPlay')){
      this.globalData.backgroundAudioManager.src = this.globalData.file.background_music
    }
  },
  onHide: function() {
    this.globalData.backgroundAudioManager.pause()
  },
  _creatBackgroundAudioManager: function () {
    this.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.globalData.backgroundAudioManager.title = '背景音乐'
    this.globalData.backgroundAudioManager.epname = '背景音乐'
    this.globalData.backgroundAudioManager.singer = '背景音乐'
    this.globalData.backgroundAudioManager.coverImgUrl = ''
    this.globalData.backgroundAudioManager.onEnded(()=>{
      if(wx.getStorageSync('musicPlay')){
        this.globalData.backgroundAudioManager.src = this.globalData.file.background_music
      }
    })
  },
  _creatUpdateManager: function () {
    this.updateManager = wx.getUpdateManager()
    this.updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  }
})