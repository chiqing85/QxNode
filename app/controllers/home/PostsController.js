module.exports = class Posts {
	async index(ctx, next) {
		// 接收路由传参
		let id = ctx.params['id']
		ctx.body = `这是文章${id}页面`
	}
}