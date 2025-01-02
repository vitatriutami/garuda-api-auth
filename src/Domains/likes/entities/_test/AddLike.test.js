const AddLike = require('../AddLike')

describe('a AddLike entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange
		const payload = {
			threadId: 'abc',
		}

		// Action and Assert
		expect(() => new AddLike(payload)).toThrowError(
			'ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const payload = {
			threadId: 123,
			commentId: 'thread-123',
			credentialId: 'user-123',
		}

		// Action and Assert
		expect(() => new AddLike(payload)).toThrowError(
			'ADD_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create AddLike object correctly', () => {
		// Arrange
		const payload = {
			threadId: 'dicoding',
			commentId: 'thread-123',
			credentialId: 'user-123',
		}

		// Action
		const addLike = new AddLike(payload)

		// Assert
		expect(addLike.threadId).toEqual(payload.threadId);
		expect(addLike.commentId).toEqual(payload.commentId)
		expect(addLike.credentialId).toEqual(payload.credentialId)
	})
})
