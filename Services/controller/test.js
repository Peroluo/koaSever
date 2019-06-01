import { Controller, Post, Auth, Get, Required } from '../decorator'

@Controller
export default class Test {
  @Post
  @Required(['name', 'password'])
  login(ctx, next) {
    ctx.body = '2'
  }
}
