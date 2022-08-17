const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const isRepeatReq = ctx.service.jira.checkRepeat()
    if (isRepeatReq) {
      ctx.body = 'too fast'
      return
    }
    ctx.body = global.sentMap
  }
}

module.exports = HomeController
