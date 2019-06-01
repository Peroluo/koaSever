import { Controller, Post, Auth, Get, Log, Required } from '../decorator/router'
import { throws } from 'assert'

@Controller
export default class Admin {
  @Get
  @Auth
  login(ctx, next) {
    try {
      throw new Error('服务出错了！')
      // ctx.body = { a: 1, b: 2 }
    } catch (e) {
      throw e
    }
  }
}
