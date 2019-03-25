// 当前程序路径
let path = process.cwd(),
	{ options } = require(path + '/config/config'),
	index = require(path + '/lib/index')

let app = new index( options )
app.init()
