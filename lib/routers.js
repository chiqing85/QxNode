module.exports = class routers {
	constructor(u) {
		this.u = u || '/'
	};
	init() {
		// 加载路由配置文件
		let array = require( web_path + '/router/index'),
			router = require('koa-router')(),
			r = null

		array.forEach( v => {
			if(v[1] == this.u)
			{
				r = v;
			}
		})
		let rs = r[2].split('@')
			, Controllers = require('../app/controllers/' + rs[0])
			, cont = new Controllers()

		router[r[0]](this.u, cont[rs[1]])
		return router.routes()
	};
}
