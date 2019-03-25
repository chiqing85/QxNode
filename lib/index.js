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

		// 视图
		nunjucks.configure(web_path + '/app/views', {autoescape: true, watch: true})
		app.use(views(web_path + '/app/views', {
		    map: { html: 'nunjucks' }
		}));
		// 静态资源
		app.use(statics(web_path + '/web'))
		// 根据url后缀，加载路由－>控制器
		app.use(async (ctx, next) => {
			// 获取url
			this.u = ctx.url
			let rout = new routers(this.u)
			app.use(rout.init())
			await next()
		})
		// 根据配制端口，启动
		app.listen(this.o.port)
		console.log("app started at port " + this.o.port + "...")
	}
};