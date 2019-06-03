const request = require('request-promise')

// 从其他服务获取数据
class Server {
  /**
   * 初始化Sever相关属性
   * @param timeout 请求过期时间
   */
  constructor(timeout) {
    this.TIMEOUT = timeout || 10000
  }

  /**
   * 普通http请求
   * @param ctx
   * @param url
   * @param params
   * @param method
   * @returns {Promise<void>}
   */
  async httpRequest(url, params, method = 'post') {
    return await request[method]({
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      timeout: this.TIMEOUT,
      body: params
    })
  }

  // 添加其他请求(文件上传....) todo
}
module.exports = Server
