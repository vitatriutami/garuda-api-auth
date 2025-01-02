const CreatedLike = require('../CreatedLike')

describe('CreatedLike entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange
		const status = null

		// Action and Assert
		expect(() => new CreatedLike(status)).toThrowError(
			'ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const status = true

		// Action and Assert
		expect(() => new CreatedLike(status)).toThrowError(
			'ADD_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create CreatedLike object correctly', () => {
		// Arrange
		const status = 'success'

		// Action
		const payload = new CreatedLike(status)

		// Assert
		expect(payload.status).toEqual(status)
	})
})
