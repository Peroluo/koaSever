const log4js = require('log4js')
function secondsToFormateDate() {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  return [year, month, day]
    .map(number => {
      return number < 10 ? `0${number}` : number
    })
    .join('-')
}
log4js.configure({
  appenders: {
    logs: {
      type: 'dateFile',
      filename: `./Services/logs/${secondsToFormateDate()}.log`,
      pattern: '.yyyy-MM-dd',
      alwaysIncludePattern: false
    }
  },
  categories: {
    default: { appenders: ['logs'], level: 'debug' }
  }
})

const logger = log4js.getLogger('servicelogs')
export default logger
