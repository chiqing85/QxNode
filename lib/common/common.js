// 公共函数
// 首字母转大写
fistLetterUpper = (e) => {
	if(e != undefined) {
		return e.charAt(0).toUpperCase()+e.slice(1);
	} else {
		return e
	}
}

module.exports = { fistLetterUpper }