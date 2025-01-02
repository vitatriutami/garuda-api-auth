const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const pool = require('../../database/postgres/pool')
const ServerTestHelper = require('../../../../tests/ServerTestHelper')
const container = require('../../container')
const createServer = require('../createServer')

describe('/likes endpoint', () => {
	afterAll(async () => {
		await pool.end()
	})

	afterEach(async () => {
		await LikesTableTestHelper.cleanTable()
		await CommentsTableTestHelper.cleanTable()
		await ThreadsTableTestHelper.cleanTable()
		await UsersTableTestHelper.cleanTable()
	})

	describe('when PUT /likes', () => {
		it('should response 200 and persisted likes', async () => {
			// Arrange
			const threadId = 'thread-123'
			const commentId = 'comment-123'

			// eslint-disable-next-line no-undef
			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			await CommentsTableTestHelper.addComment({ id: 'comment-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'PUT',
				url: `/threads/${threadId}/comments/${commentId}/likes`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(200)
			expect(responseJson.status).toEqual('success')
		})

		it('should response 404 when comment not available', async () => {
			// Arrange
			const threadId = 'thread-123'
			const commentId = 'xxx'

			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			await CommentsTableTestHelper.addComment({ id: 'comment-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'PUT',
				url: `/threads/${threadId}/comments/${commentId}/likes`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(404)
			expect(responseJson.status).toEqual('fail')
			expect(responseJson.message).toEqual('Comment id tidak ditemukan')
		})
	})
})
