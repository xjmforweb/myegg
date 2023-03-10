const chalk = require('chalk')
const Controller = require('egg').Controller

const indexRule = {
  issueId: 'string',
  user_id: 'string',
}

class JiraController extends Controller {
  async index() {
    const { ctx } = this
    ctx.validate(indexRule, ctx.query)
    const userEmail = await ctx.service.jira.findAssignUserEmail()
    if (!userEmail) {
      ctx.logger.error(new Error(ctx.query))
      ctx.body = 'not assignee'
      return
    }
    const userId = await ctx.service.jira.getUserId(userEmail)
    await ctx.service.jira.sendMsg(userId, ctx.query.issueId)
    ctx.body = 'ok'
  }
}

module.exports = JiraController
