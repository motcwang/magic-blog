const articleService = require('../services/article-service')

module.exports = {
      async page(ctx) {
            const list = await articleService.page()
            ctx.body = list
      },

      async create(ctx) {
            const article = {}
            await articleService.create(article)
            ctx.body = 'success'
      }
}