const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  console.log('1')
  const start = Date.now();
  await next();
  console.log('2')
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  console.log('3')
  const start = Date.now();
  await next();
  console.log('4')
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  console.log('5')
  ctx.body = 'Hello World';
});

app.listen(3000);