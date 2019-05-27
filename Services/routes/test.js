import { Controller, Post, Auth, Get, Log, Required } from '../decorator/router'

@Controller('/test')
export default class AdminRouter {
  @Get('/login')
  adminLogin(ctx, next) {
    ctx.body = '2'
  }
}
