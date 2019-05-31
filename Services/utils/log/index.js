import log4js from 'log4js'
import Help from '../help'
class Log {
  // 日志属性
  constructor(logoName) {
    this.logoName = logoName
  }

  /**
   * 日志生成工具
   * @param {日志类型} type
   */
  initLog(type, withDate = true) {
    const filename = withDate
      ? `./Services/logs/${type}.${new Help().newDateYYMMDD()}.log`
      : `./Services/logs/${type}.log`
    log4js.configure({
      appenders: {
        logs: {
          type: 'dateFile',
          filename,
          pattern: '.yyyy-MM-dd',
          alwaysIncludePattern: false
        }
      },
      categories: {
        default: { appenders: ['logs'], level: 'debug' }
      }
    })
    return log4js.getLogger(this.logoName)
  }

  /**
   * 生成错误日志
   * @param {error日志信息} errorMsg
   */
  error(errorMsg) {
    this.initLog('Error').error(errorMsg)
    this.initLog('Log', false).error(errorMsg)
  }

  /**
   * 生成错误日信息
   * @param {Info日志信息} infoMsg
   */
  info(infoMsg) {
    this.initLog('Info').info(infoMsg)
    this.initLog('Log', false).info(infoMsg)
  }
}
export default new Log('koaseverlog')
