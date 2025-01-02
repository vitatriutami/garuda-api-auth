const routes = (handler) => [
	{
		method: 'POST',
		path: '/threads/{threadId}/comments/{commentId}/replies',
		handler: handler.handlerPostReply,
		options: {
			auth: 'forum_jwt',
		},
	},
	{
		method: 'DELETE',
		path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
		handler: handler.handlerDeleteReply,
		options: {
			auth: 'forum_jwt',
		},
	},
]

module.exports = routes
