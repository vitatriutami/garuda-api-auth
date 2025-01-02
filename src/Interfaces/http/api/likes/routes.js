const routes = (handler) => [
	{
		method: 'PUT',
		path: '/threads/{threadId}/comments/{commentId}/likes',
		handler: handler.handlerAddLike,
		options: {
			auth: 'forum_jwt',
		},
	},
]

module.exports = routes
