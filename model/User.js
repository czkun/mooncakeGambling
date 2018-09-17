import Base from 'Base.js'

class User extends Base{

  constructor(){
    super()
  }

  /* 更新用户信息 */
  updateInfo(nickname,avatar,callback){
    let params = {
      url: '/api/account/updateInfo',
      type: 'post',
      data: {
        nickname: nickname,
        avatar: avatar
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获得分享的code */
  shareCode(callback){
    let params = {
      url: '/api/bobing/shareCode',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 点击他人分享的链接 */
  shareClick(code,callback){
    let params = {
      url: '/api/bobing/shareClick',
      type: 'post',
      data: {
        code: code,
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 点击广告获得次数 */
  adClick(id,callback){
    let params = {
      url: '/api/bobing/adClick',
      type: 'post',
      data: {
        id: id,
      },
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default User