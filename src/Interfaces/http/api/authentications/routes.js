const routes = (handler) => [
	{
		method: 'POST',
		path: '/authentications',
		handler: handler.handlerPostAuth,
	},
	{
		method: 'PUT',
		path: '/authentications',
		handler: handler.handlerPutAuth,
	},
	{
		method: 'DELETE',
		path: '/authentications',
		handler: handler.handlerDeleteAuth,
	},
]

module.exports = routes
