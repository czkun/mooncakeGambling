// pages/webView/webView.js
import User from '../../model/User'
const user = new User()

Page({
  data: {
      url: '',
      id: 0
  },

  onLoad: function (res) {
      this.setData({
        url: res.url,
        id: res.id,
      })
  },

  /* 点击广告图 */
  _adClick() {
    let id = this.data.id
    user.adClick(id,(res) => {
      console.log(res)
    })
  }
})