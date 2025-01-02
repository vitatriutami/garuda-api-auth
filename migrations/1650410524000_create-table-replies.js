/* eslint-disable camelcase */
exports.up = (pgm) => {
	pgm.createTable('replies', {
		id: {
			type: 'VARCHAR(50)',
			primaryKey: true,
			notNull: true,
		},
		content: {
			type: 'TEXT',
			notNull: true,
		},
		date: {
			type: 'VARCHAR(30)',
			notNull: true,
		},
		owner: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		thread_id: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		comment_id: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		is_removed: {
			type: 'BOOLEAN',
			default: false,
		},
	})

	pgm.addConstraint(
		'replies',
		'fk_replies.owner_user.id',
		'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
	)
	pgm.addConstraint(
		'replies',
		'fk_replies.thread_id_thread.id',
		'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE'
	)
	pgm.addConstraint(
		'replies',
		'fk_replies.comment_id_comment.id',
		'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE'
	)
}

exports.down = (pgm) => {
	pgm.dropTable('replies')
}
