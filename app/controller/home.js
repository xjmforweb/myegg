const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    if (ctx.query.log) {
      ctx.logger.debug(new Date())
    }
    ctx.body = 'Today is ' + new Date()
  }
}

module.exports = HomeController
