import { resolve } from 'path'
import KoaRouter from 'koa-router'
import glob from 'glob'
import R from 'ramda'

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

export const setRouter = method => (target, key, descriptor) => {
  routeMap.push({
    target,
    method,
    path: `/${descriptor.value.name}`,
    callback: changeToArr(target[key])
  })
  return descriptor
}
export const Controller = target => (target.prototype[pathPrefix] = target.name)

export const Get = setRouter('get')

export const Post = setRouter('post')

export const Put = setRouter('put')

export const Delete = setRouter('delete')
