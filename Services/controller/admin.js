import { Controller, Post, Get } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
@Controller
export default class Admin {
  @Get
  @Required(['name', 'password'])
  getUserInfo(ctx) {
    // throw new Error('服务出错了！')
    ctx.body = { a: 1, b: 2 }
  }
}
