let koa = require('koa')
app = new koa()

app.use(async (ctx, next) => {
	ctx.body = '<h1>Hello Node.js</h1>'
})

app.listen(8080)

console.log("app started at port " + 8080 + "...")