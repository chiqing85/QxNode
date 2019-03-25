module.exports = class Index {
	async index(ctx, next) {
		let data = {
			content: 'QxNode.js v2.0.1',
			title: 'hi, QxNode'
		}
		await ctx.render('index', data)
	}

	async show(ctx, next) {

		ctx.body = "<h1>holle word!</h1>"
	}
}