class Help {
  // 生成当前时间的YY-MM-DD的时间格式
  static newDateYYMMDD() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day]
      .map(number => {
        return number < 10 ? `0${number}` : number
      })
      .join('-')
  }
  // 获取url的请求参数
  static getRequestParmas(url) {
    const theRequest = new Object()
    if (url.indexOf('?') != -1) {
      const reqStr = url.split('?')[1].split('&')
      for (var i = 0; i < reqStr.length; i++) {
        theRequest[reqStr[i].split('=')[0]] = reqStr[i].split('=')[1]
      }
    }
    return theRequest
  }
}
export default Help
