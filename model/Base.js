import config from '../config.js'

class Base{

  constructor() {
    this.baseUrl = config.baseUrl
  }

  /* 请求 */
  request(params) {
    let that = this,
      url = this.baseUrl + params.url
    if (!params.type) {
      params.type = 'get'
    }
    wx.request({
      url: url,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      data: params.data,
      success: (res) => {
        if (res.data.status != 20000){
          this.error(res, params)
        }
        params.sCallback && params.sCallback(res.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  error(res, params){
    console.log(res)
    switch (res.data.status){
      case 40001:
        wx.clearStorageSync()
        this.getToken()
        break
      case 40002:
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 3000
        })
        break
      case 10003:
        wx.setStorageSync('isBindMobile', false)
        break
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 3000
        })
    }
  }

  /* 获取token */
  getToken(callback){
    wx.login({
      success: res => {
        let params = {
          url: '/api/account/wxLogin',
          data: {
            code: res.code,
          },
          type: 'post',
          sCallback: (res) => {
            wx.setStorageSync('token', res.data.token)
            callback && callback(res)
          }
        }
        this.request(params)
      }
    })
  }

  /* 获得元素上的绑定的值 */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  };
  
  /* 更改input的值 */
  iptChange(event, that) {
    that.setData({
      [event.currentTarget.dataset.name]:event.detail.value
    })
  }
  
}

export default Base