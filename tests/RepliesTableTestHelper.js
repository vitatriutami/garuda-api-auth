/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const RepliesTableTestHelper = {
	async addReply({
		id = 'reply-123',
		content = 'dicoding',
		date = '2021-08-08T07:26:21.338Z',
		owner = 'user-123',
		thread = 'thread-123',
		comment = 'comment-123',
	}) {
		const query = {
			text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
			values: [id, content, date, owner, thread, comment],
		}

		await pool.query(query)
	},

	async findReplyById(id) {
		const query = {
			text: 'SELECT * FROM replies WHERE id = $1',
			values: [id],
		}

		const result = await pool.query(query)
		return result.rows
	},

	async cleanTable() {
		await pool.query('DELETE FROM replies WHERE 1=1')
	},
}

module.exports = RepliesTableTestHelper
