const Controller = require('egg').Controller

class EsourceController extends Controller {
  async index() {
    const { ctx } = this
    console.log(ctx.request.body)
    if (ctx.request.body.object_attributes.status === 'success') {
      // 发消息
      await ctx.service.esource.sendMsg()
    }
    ctx.body = 'ok'
  }
}

module.exports = EsourceController
