/* eslint-disable camelcase */
exports.up = (pgm) => {
	pgm.createTable('likes', {
		id: {
			type: 'VARCHAR(50)',
			primaryKey: true,
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
	})

	pgm.addConstraint(
		'likes',
		'fk_likes.owner_user.id',
		'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
	)
	pgm.addConstraint(
		'likes',
		'fk_likes.thread_id_thread.id',
		'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE'
	)
	pgm.addConstraint(
		'likes',
		'fk_likes.comment_id_comment.id',
		'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE'
	)
}

exports.down = (pgm) => {
	pgm.dropTable('likes')
}
