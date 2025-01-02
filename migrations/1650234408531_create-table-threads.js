/* eslint-disable camelcase */
exports.up = (pgm) => {
	pgm.createTable('threads', {
		id: {
			type: 'VARCHAR(50)',
			primaryKey: true,
		},
		title: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		body: {
			type: 'TEXT',
			notNull: true,
		},
		date: {
			type: 'VARCHAR(30)',
			notNull: true,
		},
		owner: {
			type: 'TEXT',
			notNull: true,
		},
	})

	pgm.addConstraint(
		'threads',
		'fk_threads.owner_user.id',
		'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
	)
}

exports.down = (pgm) => {
	pgm.dropTable('threads')
}
