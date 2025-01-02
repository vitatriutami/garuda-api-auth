const UserRepository = require('../../../Domains/users/UserRepository')
const AuthRepository = require('../../../Domains/authentications/AuthRepository')
const AuthTokenManager = require('../../security/AuthTokenManager')
const PasswordHash = require('../../security/PasswordHash')
const LoginUserUseCase = require('../LoginUserUseCase')
const NewAuth = require('../../../Domains/authentications/entities/NewAuth')

describe('GetAuthUseCase', () => {
	it('should orchestrating the get authentication action correctly', async () => {
		// Arrange
		const useCasePayload = {
			username: 'dicoding',
			password: 'secret',
		}
		const expectedAuth = new NewAuth({
			accessToken: 'access_token',
			refreshToken: 'refresh_token',
		})
		const mockUserRepository = new UserRepository()
		const mockAuthRepository = new AuthRepository()
		const mockAuthTokenManager = new AuthTokenManager()
		const mockPasswordHash = new PasswordHash()

		// Mocking
		mockUserRepository.getPasswordByUsername = jest.fn(() =>
			Promise.resolve('encrypted_password')
		)
		mockPasswordHash.comparePassword = jest.fn(() => Promise.resolve())
		mockAuthTokenManager.createAccessToken = jest.fn(() =>
			Promise.resolve(expectedAuth.accessToken)
		)
		mockAuthTokenManager.createRefreshToken = jest.fn(() =>
			Promise.resolve(expectedAuth.refreshToken)
		)
		mockUserRepository.getIdByUsername = jest.fn(() =>
			Promise.resolve('user-123')
		)
		mockAuthRepository.addToken = jest.fn(() => Promise.resolve())

		// create use case instance
		const loginUserUseCase = new LoginUserUseCase({
			userRepository: mockUserRepository,
			authRepository: mockAuthRepository,
			authTokenManager: mockAuthTokenManager,
			passwordHash: mockPasswordHash,
		})

		// Action
		const actualAuthentication = await loginUserUseCase.execute(
			useCasePayload
		)

		// Assert
		expect(actualAuthentication).toEqual(expectedAuth)
		expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(
			'dicoding'
		)
		expect(mockPasswordHash.comparePassword).toBeCalledWith(
			'secret',
			'encrypted_password'
		)
		expect(mockUserRepository.getIdByUsername).toBeCalledWith('dicoding')
		expect(mockAuthTokenManager.createAccessToken).toBeCalledWith(
			{ username: 'dicoding', id: 'user-123' }
		)
		expect(
			mockAuthTokenManager.createRefreshToken
		).toBeCalledWith({ username: 'dicoding', id: 'user-123' })
		expect(mockAuthRepository.addToken).toBeCalledWith(
			expectedAuth.refreshToken
		)
	})
})
