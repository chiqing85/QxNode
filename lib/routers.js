module.exports = class routers {
	constructor(u) {
		this.u = u || '/'
	};
	init() {
		// 加载路由配置文件
		let array = require( web_path + '/router/index'),
			router = require('koa-router')(),
			r = null		
		for(let v of array) {
			if(v[1] == this.u)
			{
				r = v;
				break;
			}else if(v[1].indexOf('/:') != -1) {
				// 出现位置
				let l = v[1].indexOf('/:'),
					s = v[1].substr(0, l),
					u = this.u.lastIndexOf("\/"),
					su = this.u.substr(0, u)
				if(s == su) {					
					r = v
					break;
				}
			}
		}
		// 没有匹配到路由，直接跳 404
		if(r == null) {
			router.get(this.u, async (ctx, next) => {
				ctx.status = 404
				await ctx.render('404')
			})
		} else {
			let rs = r[2].split('@')
				, Controllers = require(web_path + '/app/controllers/' + rs[0])
				, cont = new Controllers()

			router[r[0]](r[1], cont[rs[1]])
		}
		return router.routes()
	};
}
