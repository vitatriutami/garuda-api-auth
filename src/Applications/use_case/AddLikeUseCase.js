const AddLike = require('../../Domains/likes/entities/AddLike')

class AddLikeUseCase {
	constructor({ threadRepository, commentRepository, likeRepository }) {
		this._threadRepository = threadRepository
		this._commentRepository = commentRepository
		this._likeRepository = likeRepository
	}

	async execute(threadId, commentId, credentialId) {
		const addLike = new AddLike({ threadId, commentId, credentialId })
		// validate threadId
		await this._threadRepository.getThreadById(threadId)
		// validate commentId
		await this._commentRepository.getCommentById(commentId)
		const availableLikes = await this._likeRepository.verifyLikeOwner(
			addLike
		)
		if (availableLikes.length) {
			return await this._likeRepository.deleteLike(addLike)
		} else {
			return await this._likeRepository.addLike(addLike)
		}
	}
}

module.exports = AddLikeUseCase
