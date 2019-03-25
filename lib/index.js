module.exports = class app {
	constructor(o) {
		this.o = o
	}
	init() {
		let koa = require('koa'),
			app = new koa()

		app.use(async (ctx, next) => {
			ctx.body = '<h1>Hello qxNode.js</h1>'
		})

		app.listen(this.o.port)
		console.log("app started at port " + this.o.port + "...")
	}
};