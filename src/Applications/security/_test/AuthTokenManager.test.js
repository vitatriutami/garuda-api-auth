const AuthTokenManager = require('../AuthTokenManager')

describe('AuthTokenManager interface', () => {
	it('should throw error when invoke unimplemented method', async () => {
		// Arrange
		const tokenManager = new AuthTokenManager()

		// Action & Assert
		await expect(tokenManager.createAccessToken('')).rejects.toThrowError(
			'AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
		)
		await expect(tokenManager.createRefreshToken('')).rejects.toThrowError(
			'AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
		)
		await expect(tokenManager.verifyRefreshToken('')).rejects.toThrowError(
			'AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
		)
		await expect(tokenManager.decodePayload('')).rejects.toThrowError(
			'AUTH_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
		)
	})
})
