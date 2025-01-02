/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const LikesTableTestHelper = {
	async addLike({
		id = 'like-123',
		owner = 'user-123',
		thread_id = 'thread-123',
		comment_id = 'comment-123',
	}) {
		const query = {
			text: 'INSERT INTO likes VALUES($1, $2, $3, $4)',
			values: [id, owner, thread_id, comment_id],
		}

		await pool.query(query)
	},

	async verifyAvailableLike({ credentialId, threadId, commentId }) {
		const query = {
			text: 'SELECT * FROM likes WHERE owner = $1 AND thread_id = $2 AND comment_id = $3',
			values: [credentialId, threadId, commentId],
		}

		const result = await pool.query(query)
		return result.rows
	},

	async deleteLike(owner, threadId, commentId) {
		const query = {
			text: 'DELETE FROM likes WHERE owner=$1 AND thread_id=$2 AND comment_id=$3',
			values: [owner, threadId, commentId],
		}

		const result = await pool.query(query)
		return result.rows
	},

	async cleanTable() {
		await pool.query('DELETE FROM likes WHERE 1=1')
	},
}

module.exports = LikesTableTestHelper
