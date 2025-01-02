class AuthRepository {
	async addToken(token) {
		throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async checkTokenAvailability(token) {
		throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}

	async deleteToken(token) {
		throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED')
	}
}

module.exports = AuthRepository
