
App({
  globalData: {
    file: null,
    backgroundAudioManager: null,
  },
  onLaunch: function () {
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
  onShow: function(options) {
    if(wx.getStorageSync('musicPlay')){
      this.globalData.backgroundAudioManager.src = this.globalData.file.background_music
    }
  },
  onHide: function() {
    this.globalData.backgroundAudioManager.pause()
  }
})