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
			}else if(v[1].indexOf('/:') != -1) {
				// 出现位置
				let l = v[1].indexOf('/:'),
					s = v[1].substr(0, l),
					u = this.u.lastIndexOf("\/"),
					su = this.u.substr(0, u)

				if(s == su) {					
					r = v
				}
			}
			
		})
		let rs = r[2].split('@')
			, Controllers = require('../app/controllers/' + rs[0])
			, cont = new Controllers()

		router[r[0]](r[1], cont[rs[1]])
		return router.routes()
	};
}
