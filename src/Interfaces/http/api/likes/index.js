const LikesHandler = require('../likes/handler')
const routes = require('../likes/routes')

module.exports = {
	name: 'likes',
	register: async (server, { container }) => {
		const likesHandler = new LikesHandler(container)
		server.route(routes(likesHandler))
	},
}
