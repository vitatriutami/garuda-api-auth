/* eslint-disable no-unused-vars */
class CommentRepository {
	async addComment(payload) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async deleteComment(id) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async getCommentById(id) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async verifyCommentOwner(id, owner) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async getCommentByThreadId(threadId) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}
}

module.exports = CommentRepository
