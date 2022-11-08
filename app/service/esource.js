const Service = require('egg').Service

class EsourceService extends Service {
  async sendMsg(content) {
    const { ctx } = this
    if (!global.accessToken) await ctx.service.jira.getToken()
    const { res } = await this.ctx.curl('https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + global.accessToken, {
      method: 'post',
      dataType: 'json',
      contentType: 'json',
      data: {
        touser: 13107707325,
        msgtype: 'text',
        agentid: 1000037,
        text: {
          content,
        },
      },
    })
    if (res.data.errcode === 42001) {
      await ctx.service.jira.getToken()
      await this.sendMsg()
    }
  }
}

module.exports = EsourceService
