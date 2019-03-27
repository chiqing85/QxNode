// 全局 程序根目录
global.web_path = process.cwd()

let	env = require(web_path + '/config/app'),
	index = require(web_path + '/lib/index')

let app = new index( env )
app.init()
