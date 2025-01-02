const LikesRepository = require('../LikesRepository')

describe('LikesRepository interface', () => {
	it('should throw error when invoke abstract behavior', async () => {
		// Arrange
		const likesRepository = new LikesRepository()

		// Action and Assert
		await expect(likesRepository.addLike({})).rejects.toThrowError(
			'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
		)
		await expect(likesRepository.deleteLike({})).rejects.toThrowError(
			'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
		)
		await expect(likesRepository.verifyLikeOwner({})).rejects.toThrowError(
			'LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED'
		)
	})
})
