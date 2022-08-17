const chalk = require('chalk')
const Service = require('egg').Service

const LIMIT = 5 * 60 * 1000 // 5分钟

class JiraService extends Service {
  constructor(ctx) {
    super(ctx)
    this.accessToken = null
    this.sentMap = {}
  }

  // 是否重复触发
  checkRepeat() {
    const preTime = this.sentMap[this.ctx.query.user_id + this.ctx.query.issueId]
    const now = new Date().getTime()
    this.sentMap[this.ctx.query.user_id + this.ctx.query.issueId] = now
    if (!preTime) return false
    return now - preTime < LIMIT
  }

  async findAssignUserEmail() {
    const { ctx } = this
    console.log(chalk.yellow(ctx.query.issueId))
    const { res } = await ctx.curl('https://jira.primelifescience.com.cn/rest/api/2/issue/' + ctx.query.issueId, {
      method: 'get',
      dataType: 'json',
      headers: {
        Authorization: `Basic ${Buffer.from(
          'prime1:123456'
        ).toString('base64')}`,
        Accept: 'application/json',
      },
    })
    if (res.data.fields.assignee.name === ctx.query.user_id) return false
    return res.data.fields.assignee.emailAddress
  }

  async getToken() {
    const { res } = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww1b72481777a8e8a8&corpsecret=fu09sgyVE54LYu86Vkj5QTiaMjVNRFECDuenZ-HdmVU', {
      dataType: 'json',
    })
    this.accessToken = res.data.access_token
    console.log(chalk.red('access_token: ' + this.accessToken))
  }
  // 获取企业微信用户id
  async getUserId(userEmail) {
    const { ctx } = this
    if (!this.accessToken) await this.getToken()
    const { res } = await ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/user/get_userid_by_email?access_token=' + this.accessToken, {
      method: 'post',
      dataType: 'json',
      contentType: 'json',
      data: {
        email: userEmail,
      },
    })
    console.log(chalk.blue(JSON.stringify(res.data)))
    if (res.data.errcode === 42001) {
      // 过期
      await this.getToken()
      return this.getUserId()
    }
    return res.data.userid
  }

  // 发送消息
  async sendMsg(userid, issueId) {
    const { res } = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + this.accessToken, {
      method: 'post',
      dataType: 'json',
      contentType: 'json',
      data: {
        touser: userid,
        msgtype: 'text',
        agentid: 1000037,
        text: {
          content: `<a href='https://jira.primelifescience.com.cn/browse/${issueId}'>[${issueId}]</a>有新的任务分配给你，请注意查看。`,
        },
      },
    })
    console.log(chalk.green(JSON.stringify(res.data)))
  }
}

module.exports = JiraService
