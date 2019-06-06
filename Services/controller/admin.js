import { Controller, RequestMapping } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
@Controller
class Admin {
  @RequestMapping('get')
  getUserInfo(ctx) {
    console.log(ctx.params)

    ctx.body = { a: 1, b: 2 }

    ctx.redirect('/')
  }
}
export default Admin
