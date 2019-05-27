import { Route } from '../decorator/router'
import { resolve } from 'path'
import bodyParser from 'koa-bodyparser'
import logger from '../utils/log'

export const addBodyParser = app => {
  app.use(bodyParser())
}
// log一定要放到router前面
export const log = app => {
  app.use(async (ctx, next) => {
    const startTime = new Date().getTime()
    try {
      await next()
      const endTime = new Date().getTime()
      if (ctx.response.status === 200) {
        if (ctx.method === 'GET') {
          const info = `${ctx.method} ==> ${
            ctx.url
          } ==> 返回数据: ${JSON.stringify(ctx.body)} ==> 耗时：${Math.round(
            endTime - startTime
          ) + 'ms'}`
          logger.info(info)
        }
        if (ctx.method === 'POST') {
          const info = `${ctx.method} ==> ${
            ctx.url
          } ==> 请求参数:  ${JSON.stringify(
            ctx.request.body
          )} ==> 返回数据: ${JSON.stringify(ctx.body)} ==> 耗时：${Math.round(
            endTime - startTime
          ) + 'ms'}`
          logger.info(info)
        }
      } else {
        const error = `${ctx.method} ==> ${ctx.url} ==> 错误信息:${
          ctx.response.message
        }`
        logger.error(error)
      }
    } catch (e) {
      const error = `${ctx.method} ==> ${ctx.url} ==> 错误信息:${e.message}`
      logger.error(error)
      ctx.body = e.message
    }
  })
}
export const router = app => {
  const routesPath = resolve(__dirname, '../routes')
  const instance = new Route(app, routesPath)
  instance.init()
}
