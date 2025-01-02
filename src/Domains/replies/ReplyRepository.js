/* eslint-disable no-unused-vars */
class ReplyRepository {
	async addReply(payload) {
		throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async deleteReplyById(id) {
		throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async getReplyById(id) {
		throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async verifyReplyOwner(id, owner) {
		throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async getRepliesByThreadId(threadId) {
		throw new Error('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}
}

module.exports = ReplyRepository
