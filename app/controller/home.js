const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = JSON.stringify(ctx)
  }
}

module.exports = HomeController
