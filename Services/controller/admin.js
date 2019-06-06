import { Controller, RequestMapping } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
@Controller
class Admin {
  @RequestMapping('get', 'id')
  @Required(['name', 'password'])
  getUserInfo(ctx) {
    console.log(ctx.params)
    // throw new Error('服务出错了！')
    ctx.body = { a: 1, b: 2 }
  }
}
export default Admin
