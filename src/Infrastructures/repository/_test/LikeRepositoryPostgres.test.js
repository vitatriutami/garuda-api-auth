const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper')
const CreatedLike = require('../../../Domains/likes/entities/CreatedLike')
const AddLike = require('../../../Domains/likes/entities/AddLike')
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres')
const pool = require('../../database/postgres/pool')

describe('CommentRepositoryPostgres', () => {
	beforeEach(async () => {
		await UsersTableTestHelper.addUser({ id: 'user-123' })
		await ThreadsTableTestHelper.addThread({ id: 'thread-123' })
		await CommentsTableTestHelper.addComment({ id: 'comment-123' })
	})

	afterEach(async () => {
		await LikesTableTestHelper.cleanTable()
		await CommentsTableTestHelper.cleanTable()
		await ThreadsTableTestHelper.cleanTable()
		await UsersTableTestHelper.cleanTable()
	})

	afterAll(async () => {
		await pool.end()
	})

	describe('addLike function', () => {
		it('should persist add like and return status success correctly', async () => {
			// Arrange
			const payload = new AddLike({
				commentId: 'comment-123',
				threadId: 'thread-123',
				credentialId: 'user-123',
			})

			const fakeIdGenerator = () => '123' // stub!
			const likeRepositoryPostgres = new LikeRepositoryPostgres(
				pool,
				fakeIdGenerator
			)

			// action
			await likeRepositoryPostgres.addLike(payload)

			// Action & Assert
			const like = await LikesTableTestHelper.verifyAvailableLike(payload)
			expect(like).toHaveLength(1)
		})

		it('should return created like correctly', async () => {
			// Arrange
			const payload = new AddLike({
				commentId: 'comment-123',
				threadId: 'thread-123',
				credentialId: 'user-123',
			})

			const fakeIdGenerator = () => '123' // stub!
			const likeRepositoryPostgres = new LikeRepositoryPostgres(
				pool,
				fakeIdGenerator
			)

			// Action
			const createdLike = await likeRepositoryPostgres.addLike(payload)

			// Assert
			expect(createdLike).toStrictEqual(new CreatedLike('success'))
		})
	})

	describe('deleteLike function', () => {
		it('should persist delete like and return like correctly', async () => {
			// Arrange
			const likeId = 'like-123'
			const payload = {
				commentId: 'comment-123',
				threadId: 'thread-123',
				owner: 'user-123',
			}
			await LikesTableTestHelper.addLike({ id: likeId })

			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {})

			// Action
			await likeRepositoryPostgres.deleteLike(payload)

			// Action & Assert
			const like = await LikesTableTestHelper.verifyAvailableLike(
				payload.owner,
				payload.threadId,
				payload.commentId
			)
			expect(like).toHaveLength(0)
		})
	})

	describe('verifyLikeOwner function', () => {
		it('should persist verify like and return array list addlike correctly', async () => {
			// Arrange
			const payload = new AddLike({
				commentId: 'comment-123',
				threadId: 'thread-123',
				credentialId: 'user-123',
			})

			const likeId = 'like-123'
			await LikesTableTestHelper.addLike({ id: likeId })

			const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {})

			// action
			const listLike = await likeRepositoryPostgres.verifyLikeOwner(
				payload
			)

			// Action & Assert
			expect(listLike).toHaveLength(1)
			expect(listLike).toMatchObject([
				{
					comment_id: 'comment-123',
					id: 'like-123',
					owner: 'user-123',
					thread_id: 'thread-123',
				},
			])
		})
	})
})
