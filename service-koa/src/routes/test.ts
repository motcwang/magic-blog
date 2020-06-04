import Router from 'koa-router';

const router = new Router();

const routers = router
  .get('/', async(ctx) => {
    ctx.body = 'hello world';
  });

export default routers;
