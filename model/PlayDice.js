import Base from 'Base.js'

class PlayDice extends Base{

  constructor(){
    super()
  }

  /* 获得可博饼次数 */
  getDice(callback){
    let params = {
      url: '/api/bobing/getDice',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 博饼投点 */
  playDice(callback){
    let params = {
      url: '/api/bobing/dice',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 分享获得博饼次数 */
  share(callback){
    let params = {
      url: '/api/bobing/share',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获取可分享次数 */
  getShare(callback){
    let params = {
      url: '/api/bobing/getShare',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default PlayDice