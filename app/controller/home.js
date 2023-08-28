const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    if (ctx.query.log) {
      ctx.logger.debug(new Date())
    }
    ctx.body = 'Today is ' + new Date()
  }

  async saveWord() {
    const { ctx } = this
    console.log(ctx.query)
    await ctx.service.saveWord.writeWord('hhhh')
    ctx.body = 'ok'
  }
}

module.exports = HomeController
