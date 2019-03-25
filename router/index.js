module.exports = [
	['get', '/', 'home/IndexController@index'],
	['get', '/show', 'home/IndexController@show'],
	['get', '/home/posts/:id', 'home/PostsController@index']
]