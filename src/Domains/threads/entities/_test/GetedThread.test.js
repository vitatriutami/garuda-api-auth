const GetedThread = require('../GetedThread')

describe('a GetedThread entities', () => {
	it('should throw error when payload did not contain needed property', () => {
		// Arrange to remove field id to get error
		const payload = {
			title: 'dicoding',
			body: 'Dicoding-Indonesia',
			date: '2021-08-08T07:19:09.775Z',
			username: 'dicoding',
		}

		const comments = [
			{
				id: 'comment-123',
				username: 'dicoding',
				date: '2021-08-08T07:22:33.555Z',
				content: 'sebuah comment',
			},
		]

		payload.comments = comments

		// Action and Assert
		expect(() => new GetedThread(payload)).toThrowError(
			'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
		)
	})

	it('should throw error when payload did not meet data type specification', () => {
		// Arrange
		const payload = {
			id: 123,
			title: 'dicoding',
			body: 'Dicoding-Indonesia',
			date: '2021-08-08T07:19:09.775Z',
			username: 'dicoding',
		}

		const comments = [
			{
				id: 'comment-123',
				username: 'dicoding',
				date: '2021-08-08T07:22:33.555Z',
				content: 'sebuah comment',
			},
		]

		payload.comments = comments

		// Action and Assert
		expect(() => new GetedThread(payload)).toThrowError(
			'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
		)
	})

	it('should create GetedThread object correctly', () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "dicoding",
      body: "Dicoding-Indonesia",
      date: "2021-08-08T07:19:09.775Z",
      username: "dicoding",
    };

    const comments = [
      {
        id: "comment-123",
        username: "dicoding",
        date: "2021-08-08T07:22:33.555Z",
        content: "sebuah comment",
      },
    ];

    payload.comments = comments;

    // Action
    const getedThread = new GetedThread(payload);

    // Assert
    expect(getedThread).toEqual({ ...payload });
  })
})
