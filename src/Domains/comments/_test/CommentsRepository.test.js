const CommentsRepository = require('../CommentsRepository')

describe('CommentsRepository interface', () => {
	it('should throw error when invoke abstract behavior', async () => {
		// Arrange
		const commentsRepository = new CommentsRepository()

		// Action and Assert
		await expect(commentsRepository.addComment({})).rejects.toThrowError(
			'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
		)
		await expect(commentsRepository.deleteComment('')).rejects.toThrowError(
			'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
		)
		await expect(
			commentsRepository.getCommentById('')
		).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
		await expect(
			commentsRepository.verifyCommentOwner('', '')
		).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
		await expect(
			commentsRepository.getCommentByThreadId('')
		).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	})
})
