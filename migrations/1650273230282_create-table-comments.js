/* eslint-disable camelcase */
exports.up = (pgm) => {
	pgm.createTable('comments', {
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
		thread_id: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		owner: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		is_removed: {
			type: 'BOOLEAN',
			default: false,
		},
	})

	pgm.addConstraint(
		'comments',
		'fk_comments.owner_user.id',
		'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
	)
	pgm.addConstraint(
		'comments',
		'fk_comments.thread_id_user.id',
		'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE'
	)
}

exports.down = (pgm) => {
	pgm.dropTable('comments')
}
