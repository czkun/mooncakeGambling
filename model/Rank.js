import Base from 'Base.js'

class Rank extends Base{

  constructor(){
    super()
  }

  /* 获得排行榜 */
  getRank(type = 0,callback){
    let params = {
      url: '/api/bobing/rank',
      data: {
        type: type
      },
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }

  /* 获得自身排行 */
  getSelfRank(callback) {
    let params = {
      url: '/api/bobing/getSelfRank',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default Rank