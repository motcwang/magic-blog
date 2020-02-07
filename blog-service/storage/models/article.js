const mongoose = require('mongoose');
const ArticleSchema = require('../schemas/article-schema');

module.exports = mongoose.model('Article', ArticleSchema);
