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
}

export default User