const Controller = require('egg').Controller

class EsourceController extends Controller {
  async index() {
    const { ctx } = this
    if (ctx.request.body.object_attributes.status === 'success') {
      const msg = `${ctx.request.body.project.name}[${ctx.request.body.object_attributes.ref}]部署完成(${ctx.request.body.commit.title})`
      // 发消息
      console.log(msg)
      await ctx.service.gitlab.sendMsg(msg, ctx.query.touser)
    }
    ctx.body = 'ok'
  }
}

module.exports = EsourceController
