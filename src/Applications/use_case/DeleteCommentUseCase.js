class DeleteCommentUseCase {
	constructor({ threadRepository, commentRepository }) {
		this._threadRepository = threadRepository
		this._commentRepository = commentRepository
	}

	async execute(threadId, commentId, owner) {
		this._validatePayload(threadId, commentId)

		await this._threadRepository.getThreadById(threadId)
		await this._commentRepository.getCommentById(commentId)
		await this._commentRepository.verifyCommentOwner(commentId, owner)
		await this._commentRepository.deleteComment(commentId)
	}

	_validatePayload(threadId, commentId) {
		if (!threadId || !commentId) {
			throw new Error('DELETE_THREAD_USE_CASE.NOT_CONTAIN_PARAMETER')
		}

		if (typeof threadId !== 'string' || typeof commentId !== 'string') {
			throw new Error(
				'DELETE_THREAD_USE_CASE.PARAMETER_NOT_MEET_DATA_TYPE_SPECIFICATION'
			)
		}
	}
}

module.exports = DeleteCommentUseCase
