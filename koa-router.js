const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');

// const convert = require('koa-convert');
// const onerror = require('koa-onerror');
// const logger = require('koa-logger');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();

const app = new Koa();
const router = new Router();

//middlewares
app.use(bodyparser)
app.use(json())
// app.use(convert(bodyparser));
// app.use(convert(json()));
// app.use(convert(logger()));
app.use(views(__dirname, { map: {html: 'nunjucks' }}))

router.get('/', async function (ctx, next) {
  await ctx.render('index.html')
});

router.get('/admin', async function (ctx, next) {
  // ctx.router available
  // ctx.body = 'Hello World!';
  await ctx.render('index.html')
});

//get post params
router.post('/register', async function (ctx, next) {
  // ctx.router available
  // ctx.body = 'Hello World!';
  console.log(ctx.request.body)
  ctx.body = 'register';
});

router.get('/api', async function (ctx, next) {
  // ctx.router available
  ctx.body = { foo: 'bar' };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(2333)

app.on('error', function(err, ctx){
  console.log(err)
  // logger.error('server error', err, ctx);
});