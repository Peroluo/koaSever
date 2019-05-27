import { resolve } from 'path'
import KoaRouter from 'koa-router'
import glob from 'glob'
import R from 'ramda'
import logger from '../utils/log'
const pathPrefix = Symbol('pathPrefix')
const routeMap = []

const resolvePath = R.unless(R.startsWith('/'), R.curryN(2, R.concat)('/'))

// R.unless(status,fn)如果传入的的值满足status,按原样返回，否则执行fn
// R.of=>将参数,放在数组里面
const changeToArr = R.unless(R.is(Array), R.of)

export class Route {
  constructor(app, routesPath) {
    this.app = app
    this.router = new KoaRouter()
    this.routesPath = routesPath
  }

  init = () => {
    const { app, router, routesPath } = this

    glob.sync(resolve(routesPath, './*.js')).forEach(require)

    R.forEach(({ target, method, path, callback }) => {
      const prefix = resolvePath(target[pathPrefix])
      router[method](prefix + path, ...callback)
    })(routeMap)

    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

export const convert = middleware => (target, key, descriptor) => {
  target[key] = R.compose(
    R.concat(changeToArr(middleware)),
    changeToArr
  )(target[key])
  return descriptor
}

export const setRouter = method => path => (target, key, descriptor) => {
  routeMap.push({
    target,
    method,
    path,
    callback: changeToArr(target[key])
  })
  return descriptor
}
export const Controller = path => target =>
  (target.prototype[pathPrefix] = path)

export const Get = setRouter('get')

export const Post = setRouter('post')

export const Put = setRouter('put')

export const Delete = setRouter('delete')

// export const Log = convert(async (ctx, next) => {
//   const startTime = new Date().getTime()
//   try {
//     await next()
//     const endTime = new Date().getTime()
//     if (ctx.method === 'GET') {
//       const info = `${ctx.method} ==> ${ctx.url} ==> 返回数据: ${JSON.stringify(
//         ctx.body
//       )} ==> 耗时：${Math.round(endTime - startTime) + 'ms'}`
//       logger.info(info)
//     }
//   } catch (e) {
//     const error = `${ctx.method} ==> ${ctx.url} ==> 错误信息:${e.message}`
//     logger.error(error)
//     ctx.body = e.message
//   }
// })

/**
 * @Required({
 *   body: ['name', 'password']
 * })
 */
export const Required = paramsObj =>
  convert(async (ctx, next) => {
    let errs = []

    R.forEachObjIndexed((val, key) => {
      errs = errs.concat(R.filter(name => !R.has(name, ctx.request[key]))(val))
    })(paramsObj)

    if (!R.isEmpty(errs)) {
      return (ctx.body = {
        success: false,
        errCode: 412,
        errMsg: `${R.join(', ', errs)} is required`
      })
    }
    await next()
  })

export const Auth = convert(async (ctx, next) => {
  if (!ctx.session.user) {
    return (ctx.body = {
      success: false,
      errCode: 401,
      errMsg: '登陆信息已失效, 请重新登陆'
    })
  }
  await next()
})
