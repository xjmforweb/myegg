module.exports = {
  schedule: {
    // 每天0点执行一次
    cron: '0 0 0 * * *',
    // interval: '3s',
    type: 'all',
  },
  async task(ctx) {
    ctx.service.jira.sentMap = {}
  },
}
