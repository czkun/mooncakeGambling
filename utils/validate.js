export default{

  mobile(val){
    var reg = /^1[34578]{1}\d{9}$/
    if(!reg.test(val)){
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    return true
  },

  requireVal(msg,val){
    if(val){
      return true
    }
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
    return false
  }
}