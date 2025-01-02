const routes = (handler) => [
	{
		method: 'POST',
		path: '/threads',
		handler: handler.handlerPostThread,
		options: {
			auth: 'forum_jwt',
		},
	},
	{
		method: 'GET',
		path: '/threads/{threadId}',
		handler: handler.handlerGetDetailThread,
	},
]

module.exports = routes
