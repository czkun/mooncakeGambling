import Base from 'Base.js'

class BindMobile extends Base{

  constructor(){
    super()
  }

  /* 获取短信 */
  getSmsCode(phone,callback){
    let params = {
      url: '/api/account/sendSmsCode',
      data:{
        phone: phone
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 绑定手机 */
  bindMobile(phone, code, callback) {
    let params = {
      url: '/api/account/wxPhone',
      data: {
        phone: phone,
        code: code
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default BindMobile