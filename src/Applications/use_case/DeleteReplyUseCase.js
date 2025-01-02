class DeleteReplyUseCase {
	constructor({ threadRepository, commentRepository, replyRepository }) {
		this._threadRepository = threadRepository
		this._commentRepository = commentRepository
		this._replyRepository = replyRepository
	}

	async execute(threadId, commentId, replyId, owner) {
		this._validatePayload(threadId, commentId, replyId)

		await this._threadRepository.getThreadById(threadId)
		await this._commentRepository.getCommentById(commentId)
		await this._replyRepository.getReplyById(replyId)
		await this._replyRepository.verifyReplyOwner(replyId, owner)
		await this._replyRepository.deleteReplyById(replyId)
	}

	_validatePayload(threadId, commentId, replyId) {
		if (!threadId || !commentId || !replyId) {
			throw new Error('REPLY_REPOSITORY.NOT_CONTAIN_PARAMETER')
		}

		if (
			typeof threadId !== 'string' ||
			typeof commentId !== 'string' ||
			typeof replyId !== 'string'
		) {
			throw new Error(
				'REPLY_REPOSITORY.PARAMETER_NOT_MEET_DATA_TYPE_SPECIFICATION'
			)
		}
	}
}

module.exports = DeleteReplyUseCase
