const mongoose = require('mongoose')
const { ArticleSchema } = require('../models/index')

module.exports = {
      Article: mongoose.model('Article', ArticleSchema)
}