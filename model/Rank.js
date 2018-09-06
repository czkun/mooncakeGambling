import Base from 'Base.js'

class Rank extends Base{

  constructor(){
    super()
  }

  /* 获得可博饼次数 */
  getRank(callback){
    let params = {
      url: '/api/bobing/rank',
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