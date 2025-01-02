const AddComment = require('../../Domains/comments/entities/AddComment')

class AddCommentUseCase {
	constructor({ threadRepository, commentRepository }) {
		this._threadRepository = threadRepository
		this._commentRepository = commentRepository
	}

	async execute(useCasePayload, threadId, owner) {
		useCasePayload.owner = owner
		useCasePayload.threadId = threadId

		const addComment = new AddComment(useCasePayload)

		await this._threadRepository.verifyThreadAvailability(addComment.threadId)
		
		return this._commentRepository.addComment(addComment)
	}
}

module.exports = AddCommentUseCase
