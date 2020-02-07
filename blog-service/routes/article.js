const router = require('koa-router')();
const articleController = require('../controllers/article');

const routers = router
    .get('/', articleController.page)
    .get('/crt', articleController.create);

module.exports = routers;
