const routes = (handler) => [
	{
		method: 'POST',
		path: '/users',
		handler: handler.handlerPostUser,
	},
]

module.exports = routes
