const pool = require('../../database/postgres/pool')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ServerTestHelper = require('../../../../tests/ServerTestHelper')
const container = require('../../container')
const createServer = require('../createServer')

describe('/threads endpoint', () => {
	afterAll(async () => {
		await pool.end()
	})

	afterEach(async () => {
		await CommentsTableTestHelper.cleanTable()
		await ThreadsTableTestHelper.cleanTable()
		await UsersTableTestHelper.cleanTable()
	})

	describe('when POST /threads', () => {
		it('should response 201 and persisted threads', async () => {
			// Arrange
			const requestPayload = {
				content: 'dicoding1',
			}
			const threadId = 'thread-123'

			// eslint-disable-next-line no-undef
			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads/${threadId}/comments`,
				payload: requestPayload,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(201)
			expect(responseJson.status).toEqual('success')
			expect(responseJson.data.addedComment).toBeDefined()
		})

		it('should response 400 when request payload not contain needed property', async () => {
			// Arrange
			const requestPayload = {}
			const threadId = 'thread-123'

			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads/${threadId}/comments`,
				payload: requestPayload,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(400)
			expect(responseJson.status).toEqual('fail')
			expect(responseJson.message).toEqual(
				'harus mengirimkan payload dengan properti yang lengkap'
			)
		})

		it('should response 400 when request payload not meet data type specification', async () => {
			// Arrange
			const requestPayload = {
				content: 123123,
			}
			const threadId = 'thread-123'

			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads/${threadId}/comments`,
				payload: requestPayload,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(400)
			expect(responseJson.status).toEqual('fail')
			expect(responseJson.message).toEqual(
				'setiap payload harus bertipe string'
			)
		})
	})

	describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
		it('should response 200 and persisted threads', async () => {
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
				method: 'DELETE',
				url: `/threads/${threadId}/comments/${commentId}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(200)
			expect(responseJson.status).toEqual('success')
			expect(responseJson.message).toBeDefined()
		})

		it('should response 400 when request parameter not contain needed property', async () => {
			// Arrange
			const threadId = 'thread-123'
			const commentId = 'xxx'

			const accessToken = await ServerTestHelper.getAccessToken()
			await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
			await CommentsTableTestHelper.addComment({ id: 'comment-123' })
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'DELETE',
				url: `/threads/${threadId}/comments/${commentId}`,
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
