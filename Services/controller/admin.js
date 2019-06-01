import { Controller, Post, Auth, Get, Required } from '../decorator'
@Controller
export default class Admin {
  @Get
  @Required(['name', 'password'])
  login(ctx) {
    // throw new Error('服务出错了！')
    ctx.body = { a: 1, b: 2 }
  }
}
