module.exports = class routers {
	constructor(u, c) {
		this.u = u || '/'
		this.c = c
	};
	init() {
		let suffix = false

		 if(this.c.url_html_suffix != false) {

		 	if (this.u.indexOf(this.c.url_html_suffix) != -1) {
		 		let u = this.u.split(this.c.url_html_suffix)
				suffix = true
				this.u = u[0]
		 	}
		}
		// 加载路由配置文件
		let array = require( web_path + '/router/index'),
			router = require('koa-router')(),
			r = null
		// 匹配跟帖
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

		// 没有匹配到路由
		if(r == null) {
			// 将域名分割
			let rs = this.u.split('\/'),
				// linux系统大小写敏感,将路由控制器首字母大写
				{ fistLetterUpper } = require('./common/common'),
				rs2 = fistLetterUpper( rs[2] )||'Index',
				arr = new Array(rs[0], rs[1], rs2),
				su = arr.join('/'),				
				fs = require('fs'),
				c_path = web_path + '/app/controllers' + su + 'Controller',
				// 判断路径文件是否存在
				ex = fs.existsSync(c_path + '.js')
			if(ex) {
				let c = require(c_path),
					cont = new c(),
					fn = rs[3]||'index'
				// 判断方法是否存在
				if(typeof(cont[fn]) === 'function')
				{
					// 判断 url 是否有后缀
					let sfix
					if(suffix) {
						sfix = this.c.url_html_suffix
					} else {
						sfix = ''
					}
					// 判断路由是否传参
					if(rs.length > 4 && rs[rs.length - 1] != false) {
						router.all(su + '/' + fn + '/:param' + sfix, cont[fn])
					} else {
						router.all(this.u + sfix, cont[fn])
					}
				} else {
					this.error(router)
				}
			} else {
				this.error(router)
			}
		} else {
			let rs = r[2].split('@')
				, c = require(web_path + '/app/controllers/' + rs[0])
				, cont = new c()
			router[r[0]](r[1], cont[rs[1]])
		}

		return router.routes()
	};

	error(router) {
		router.get(this.u, async (ctx, next) => {
			ctx.status = 404
			await ctx.render('404')
		})
	}
}
