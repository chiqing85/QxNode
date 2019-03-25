module.exports = class app {
	constructor(o) {
		this.o = o
		this.u = '/'
	}
	async init() {
		let koa = require('koa'),
		    nunjucks = require('nunjucks'),
			views = require('koa-views'),
			statics = require('koa-static'),
			routers = require(__dirname + '/routers'),
			app = new koa()

		
		nunjucks.configure(web_path + '/app/views', {autoescape: true, watch: true})
		app.use(views(web_path + '/app/views', {
		    map: { html: 'nunjucks' }
		}));
		app.use(statics(web_path + '/web'))
		app.use(async (ctx, next) => {
			// 获取url
			this.u = ctx.url
			let rout = new routers(this.u)
			app.use(rout.init())
			await next()
		})
		app.listen(this.o.port)
		console.log("app started at port " + this.o.port + "...")
	}
};