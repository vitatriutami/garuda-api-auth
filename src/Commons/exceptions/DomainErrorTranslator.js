const InvariantError = require('./InvariantError')

const DomainErrorTranslator = {
	translate(error) {
		return DomainErrorTranslator._directories[error.message] || error
	},
}

DomainErrorTranslator._directories = {
	'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
	),
	'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'tidak dapat membuat user baru karena tipe data tidak sesuai'
	),
	'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
		'tidak dapat membuat user baru karena karakter username melebihi batas limit'
	),
	'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
		'tidak dapat membuat user baru karena username mengandung karakter terlarang'
	),

	'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'harus mengirimkan username dan password'
	),
	'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'username dan password harus string'
	),

	'REFRESH_AUTH_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
		new InvariantError('harus mengirimkan token refresh'),
	'REFRESH_AUTH_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
		new InvariantError('refresh token harus string'),

	'DELETE_AUTH_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
		new InvariantError('harus mengirimkan token refresh'),
	'DELETE_AUTH_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
		new InvariantError('refresh token harus string'),

	'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'harus mengirimkan payload dengan properti yang lengkap'
	),
	'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'setiap payload harus bertipe string'
	),
	'ADD_THREAD.TITLE_LIMIT_CHAR': new InvariantError(
		'tidak dapat membuat thread baru karena karakter melebihi batas limit'
	),

	'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'harus mengirimkan payload dengan properti yang lengkap'
	),
	'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'setiap payload harus bertipe string'
	),

	'DELETE_THREAD_USE_CASE.NOT_CONTAIN_PARAMETER': new InvariantError(
		'harus mengirimkan parameter dengan benar'
	),
	'DELETE_THREAD_USE_CASE.PARAMETER_NOT_MEET_DATA_TYPE_SPECIFICATION':
		new InvariantError('setiap parameter harus bertipe string'),

	'REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'harus mengirimkan payload dengan properti yang lengkap'
	),
	'REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'setiap payload harus bertipe string'
	),

	'ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
		'harus mengirimkan parameter dengan benar'
	),
	'ADD_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
		'setiap parameter harus bertipe string'
	),
}

module.exports = DomainErrorTranslator
