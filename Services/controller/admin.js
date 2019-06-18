import { Controller, RequestMapping } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
@Controller
class Admin {
  @RequestMapping({ method: 'get', url: '/test/:id' })
  @Required(['NAME'])
  getUserInfo(ctx) {
    console.log(ctx.params.id)

    ctx.body = { a: 1, b: 2 }
  }
}
export default Admin
