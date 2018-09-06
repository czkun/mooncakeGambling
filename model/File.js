import Base from 'Base.js'

class File extends Base{

  constructor(){
    super()
  }

  /* 获取音乐和背景图 */
  getFile(callback){
    let params = {
      url: '/api/bobing/getFile',
      type: 'post',
      sCallback: (res) => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export default File