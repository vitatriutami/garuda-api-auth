const pool = require('../../database/postgres/pool')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ServerTestHelper = require('../../../../tests/ServerTestHelper')
const container = require('../../container')
const createServer = require('../createServer')

describe('/threads endpoint', () => {
	afterAll(async () => {
		await pool.end()
	})

	afterEach(async () => {
		await ThreadsTableTestHelper.cleanTable()
		await UsersTableTestHelper.cleanTable()
	})

	describe('when POST /threads', () => {
		it('should response 201 and persisted threads', async () => {
			// Arrange
			const requestPayload = {
				title: 'dicoding1',
				body: 'ini payload test body',
			}

			// eslint-disable-next-line no-undef
			const accessToken = await ServerTestHelper.getAccessToken()
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads`,
				payload: requestPayload,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(201)
			expect(responseJson.status).toEqual('success')
			expect(responseJson.data.addedThread).toBeDefined()
		})

		it('should response 200 and persisted detail threads', async () => {
			// eslint-disable-next-line no-undef
			const accessToken = await ServerTestHelper.getAccessToken()
			const server = await createServer(container)

			await ThreadsTableTestHelper.addThread({
				id: 'thread-123',
				title: 'dicoding',
				body: 'ini body thread',
				date: '2022-04-19 04:18:51.806',
				owner: 'user-123',
			})

			await CommentsTableTestHelper.addComment({
				id: 'comment-123',
				content: 'dicoding',
				date: '2022-04-19 04:18:51.806',
				threadId: 'thread-123',
				owner: 'user-123',
			})

			await RepliesTableTestHelper.addReply({
				id: 'reply-123',
				content: 'dicoding',
				date: '2022-04-19 04:18:51.806',
				owner: 'user-123',
				thread: 'thread-123',
				comment: 'comment-123',
			})
			const threadId = 'thread-123'

			// Action
			const response = await server.inject({
				method: 'GET',
				url: `/threads/${threadId}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})

			// Assert
			const responseJson = JSON.parse(response.payload)
			expect(response.statusCode).toEqual(200)
			expect(responseJson.status).toEqual('success')
			expect(responseJson.data.thread).toBeDefined()
			expect(responseJson.data.thread.comments).toBeDefined()
			expect(responseJson.data.thread.comments[0].replies).toBeDefined()
		})

		it('should response 400 when request payload not contain needed property', async () => {
			// Arrange
			const requestPayload = {
				body: 'ini payload test body',
			}

			const accessToken = await ServerTestHelper.getAccessToken()
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads`,
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
				title: 'dicoding',
				body: 123123,
			}

			const accessToken = await ServerTestHelper.getAccessToken()
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads`,
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

		it('should response 400 when title more than 50 character', async () => {
			// Arrange
			const requestPayload = {
				title: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
				body: 'secret body test',
			}

			const accessToken = await ServerTestHelper.getAccessToken()
			const server = await createServer(container)

			// Action
			const response = await server.inject({
				method: 'POST',
				url: `/threads`,
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
				'tidak dapat membuat thread baru karena karakter melebihi batas limit'
			)
		})
	})
})
