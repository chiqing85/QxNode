module.exports = [
	['get', '/', 'home/IndexController@index'],
	['get', '/show', 'home/IndexController@show'],
	['get', '/posts/:id', 'home/PostsController@index']
]