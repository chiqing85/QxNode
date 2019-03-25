// 全局 程序根目录
global.path = process.cwd()

let	{ options } = require(path + '/config/config'),
	index = require(path + '/lib/index')

let app = new index( options )
app.init()
