import { Controller, Post, Auth, Get, Log, Required } from '../decorator/router'

@Controller
export default class Test {
  @Get
  login(ctx, next) {
    ctx.body = '2'
  }
}
