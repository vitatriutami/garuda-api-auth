const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const CommentRepository = require('../../../Domains/comments/CommentsRepository')
const ReplyRepository = require('../../../Domains/replies/ReplyRepository')
const DeleteReplyUseCase = require('../DeleteReplyUseCase')

describe('DeleteReplyUseCase', () => {
	it('should throw error if use case payload not contain parameter', async () => {
		// Arrange
		const paramThreadId = ''
		const paramCommentId = ''
		const paramReplyId = ''
		const deleteReplyUseCase = new DeleteReplyUseCase({})

		// Action & Assert
		await expect(
			deleteReplyUseCase.execute(
				paramThreadId,
				paramCommentId,
				paramReplyId
			)
		).rejects.toThrowError('REPLY_REPOSITORY.NOT_CONTAIN_PARAMETER')
	})

	it('should throw error if commentId not string', async () => {
		// Arrange
		const paramThreadId = 'thread-123'
		const paramCommentId = 123
		const paramReplyId = 'reply-123'
		const paramOwnerId = 'user-123'
		const deleteReplyUseCase = new DeleteReplyUseCase({})

		// Action & Assert
		await expect(
			deleteReplyUseCase.execute(
				paramCommentId,
				paramThreadId,
				paramReplyId,
				paramOwnerId
			)
		).rejects.toThrowError(
			'REPLY_REPOSITORY.PARAMETER_NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should orchestrating the delete reply action correctly', async () => {
		// Arrange
		const paramThreadId = 'thread-123'
		const paramCommentId = 'comment-123'
		const paramReplyId = 'reply-123'
		const paramOwnerId = 'user-123'
		const mockThreadRepository = new ThreadRepository()
		const mockCommentRepository = new CommentRepository()
		const mockReplyRepository = new ReplyRepository()

		mockReplyRepository.verifyReplyOwner = jest.fn(() => Promise.resolve())
		mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve())
		mockCommentRepository.getCommentById = jest.fn(() => Promise.resolve())
		mockReplyRepository.getReplyById = jest.fn(() => Promise.resolve())
		mockReplyRepository.deleteReplyById = jest.fn(() => Promise.resolve())

		const deleteReplyUseCase = new DeleteReplyUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
			replyRepository: mockReplyRepository,
		})

		// Act
		await deleteReplyUseCase.execute(
			paramThreadId,
			paramCommentId,
			paramReplyId,
			paramOwnerId
		)

		// Assert
		expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(
			paramThreadId
		)
		expect(mockCommentRepository.getCommentById).toHaveBeenCalledWith(
			paramCommentId
		)
		expect(mockReplyRepository.getReplyById).toHaveBeenCalledWith(
			paramReplyId
		)
		expect(mockReplyRepository.verifyReplyOwner).toHaveBeenCalledWith(
			paramReplyId,
			paramOwnerId
		)
		expect(mockReplyRepository.deleteReplyById).toHaveBeenCalledWith(
			paramReplyId
		)
	})
})
