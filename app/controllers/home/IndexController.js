module.exports = class Index {
	async index(ctx, next) {
		let data = {
			content: 'QxNode.js v2.0.1',
			title: 'hi, friend !'
		}
		await ctx.render('home/index/index', data)
	}

	async show(ctx, next) {
		let param = ctx.params['param']
		ctx.body = `<h1>holle word!</h1><span>${param}</span>`
	}
}