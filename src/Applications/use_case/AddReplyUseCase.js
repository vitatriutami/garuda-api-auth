const AddReply = require('../../Domains/replies/entities/AddReply')

class AddReplyUseCase {
	constructor({ threadRepository, commentRepository, replyRepository }) {
		this._threadRepository = threadRepository
		this._commentRepository = commentRepository
		this._replyRepository = replyRepository
	}

	async execute(useCasePayload, owner, threadId, commentId) {
		useCasePayload.owner = owner
		useCasePayload.threadId = threadId
		useCasePayload.commentId = commentId

		const addReply = new AddReply(useCasePayload)
		await this._threadRepository.verifyThreadAvailability(addReply.threadId)
		await this._commentRepository.verifyCommentAvailability(addReply.commentId);
		return this._replyRepository.addReply(addReply)
	}
}

module.exports = AddReplyUseCase
