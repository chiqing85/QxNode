// 全局 程序根目录
global.web_path = process.cwd()

let	{ options } = require(web_path + '/config/config'),
	index = require(web_path + '/lib/index')

let app = new index( options )
app.init()
