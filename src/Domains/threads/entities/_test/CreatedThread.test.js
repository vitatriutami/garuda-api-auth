const CreatedThread = require('../CreatedThread')

describe('CreatedThread entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange
		const payload = {
			title: 'dicoding',
			owner: 'Dicoding-Indonesia',
		}

		// Action and Assert
		expect(() => new CreatedThread(payload)).toThrowError(
			'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const payload = {
			id: 123,
			title: 'dicoding',
			owner: {},
		}

		// Action and Assert
		expect(() => new CreatedThread(payload)).toThrowError(
			'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create CreatedThread object correctly', () => {
    // Arrange
    const payload = {
      id: "user-123",
      title: "dicoding",
      owner: "Dicoding-Indonesia",
    };

    // Action
    const addedThread = new CreatedThread(payload);

    // Assert
    expect(addedThread).toEqual({ ...payload });
  })
})
