const Service = require('egg').Service
const fs = require('fs').promises

class SaveWordService extends Service {
  async writeWord() {
    const { ctx } = this
    const writeHandle = await fs.open('D:\\projects\\eslintPluginEp\\lib\\chinese.js', 'a')
    await writeHandle.appendFile(ctx.query.a)
  }
}

module.exports = SaveWordService
