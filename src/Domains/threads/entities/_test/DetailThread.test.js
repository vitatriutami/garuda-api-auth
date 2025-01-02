const DetailThread = require('../DetailThread')

describe('a DetailThread entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange
		const payload = {
			title: 'abc',
		}

		// Action and Assert
		expect(() => new DetailThread(payload)).toThrowError(
			'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const payload = {
			id: 'thread-123',
			title: 123,
			body: true,
			date: '2021-08-08T07:19:09.775Z',
			username: 'user-123',
		}

		// Action and Assert
		expect(() => new DetailThread(payload)).toThrowError(
			'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "dicoding",
      body: "Dicoding-Indonesia",
      date: "2021-08-08T07:19:09.775Z",
      username: "dicoding",
    };

    // Action
    const detailThread = new DetailThread(payload);

    // Assert
    expect(detailThread).toEqual({ ...payload });
  })
})
