const Controller = require('egg').Controller

class EsourceController extends Controller {
  async index() {
    const { ctx } = this
    if (ctx.request.body.object_attributes.status === 'success') {
      // 发消息
      await ctx.service.gitlab.sendMsg(`eSource部署完成(${ctx.request.body.commit.title})`, ctx.query.touser)
    }
    ctx.body = 'ok'
  }
}

module.exports = EsourceController
