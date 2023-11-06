const { promises: fs } = require('fs')
const Controller = require('egg').Controller

const updateTextRule = {
  val: 'string',
  newVal: 'string',
}
const list = []

class ESourceController extends Controller {
  async updateText() {
    const { ctx } = this
    ctx.validate(updateTextRule, ctx.query)
    const path = 'D:\\projects\\prime-es-ui-new\\src\\locales\\en-US\\index.js'
    const str = await fs.readFile(path, 'utf8')
    const targetText = `'${ctx.query.val}'`
    if (!str.includes(targetText)) {
      ctx.body = '无匹配内容\n' + list.map(v => `\n${v.val} ===> ${v.newVal}`)
      return
    }
    const newStr = str.replace(targetText, `'${ctx.query.newVal}'`)
    await fs.writeFile(path, newStr, 'utf8')
    list.push(ctx.query)
    ctx.body = 'ok\n' + list.map(v => `\n${v.val} ===> ${v.newVal}`)
  }
}

module.exports = ESourceController
