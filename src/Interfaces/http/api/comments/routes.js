const routes = (handler) => [
	{
		method: 'POST',
		path: '/threads/{threadId}/comments',
		handler: handler.handlerPostComment,
		options: {
			auth: 'forum_jwt',
		},
	},
	{
		method: 'DELETE',
		path: '/threads/{threadId}/comments/{commentId}',
		handler: handler.handlerDeleteComment,
		options: {
			auth: 'forum_jwt',
		},
	},
]

module.exports = routes
