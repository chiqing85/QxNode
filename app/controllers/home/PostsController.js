module.exports = class Posts {
	async index(ctx, next) {
		let id = ctx.params['id']
		// 
		ctx.body = `这是文章${id}页面`
	}
}