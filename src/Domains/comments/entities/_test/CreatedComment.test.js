const CreatedComment = require('../CreatedComment')

describe('CreatedComment entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange
		const payload = {
			id: 'comment-123',
			owner: 'user-123',
		}

		// Action and Assert
		expect(() => new CreatedComment(payload)).toThrowError(
			'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const payload = {
			id: 'comment-123',
			content: 123,
			owner: 'user-123',
		}

		// Action and Assert
		expect(() => new CreatedComment(payload)).toThrowError(
			'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create CreatedComment object correctly', () => {
		// Arrange
		const payload = {
			id: 'comment-123',
			content: 'dicoding',
			owner: 'user-123',
		}

		// Action
		const createdComment = new CreatedComment(payload)

		// Assert
		expect(createdComment).toEqual(payload)
	})
})
