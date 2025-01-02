/* istanbul ignore file */

const { createContainer } = require('instances-container')

// external agency
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')
const Jwt = require('@hapi/jwt')
const pool = require('./database/postgres/pool')

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository')
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres')
const ThreadRepository = require('../Domains/threads/ThreadRepository')
const ThreadRepositoryPostgres = require('./repository/ThreadRepositoryPostgres')
const CommentRepository = require('../Domains/comments/CommentsRepository')
const CommentRepositoryPostgres = require('./repository/CommentRepositoryPostgres')
const ReplyRepository = require('../Domains/replies/ReplyRepository')
const ReplyRepositoryPostgres = require('./repository/ReplyRepositoryPostgres')
const LikeRepository = require('../Domains/likes/LikesRepository')
const LikeRepositoryPostgres = require('./repository/LikeRepositoryPostgres')

const PasswordHash = require('../Applications/security/PasswordHash')
const BcryptPasswordHash = require('./security/BcryptPasswordHash')

// use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase')
const AddThreadUseCase = require('../Applications/use_case/AddThreadUseCase')
const DetailThreadUseCase = require('../Applications/use_case/DetailThreadUseCase')
const AddCommentUseCase = require('../Applications/use_case/AddCommentUseCase')
const DeleteCommentUseCase = require('../Applications/use_case/DeleteCommentUseCase')
const AddReplyUseCase = require('../Applications/use_case/AddReplyUseCase')
const DeleteReplyUseCase = require('../Applications/use_case/DeleteReplyUseCase')
const AddLikeUseCase = require('../Applications/use_case/AddLikeUseCase')

const AuthTokenManager = require('../Applications/security/AuthTokenManager')
const JwtTokenManager = require('./security/JwtTokenManager')
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase')
const AuthRepository = require('../Domains/authentications/AuthRepository')
const AuthRepositoryPostgres = require('./repository/AuthRepositoryPostgres')
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase')
const RefreshAuthUseCase = require('../Applications/use_case/RefreshAuthUseCase')

// creating container
const container = createContainer()

// registering services and repository
container.register([
	{
		key: UserRepository.name,
		Class: UserRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
				{
					concrete: nanoid,
				},
			],
		},
	},
	{
		key: AuthRepository.name,
		Class: AuthRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
			],
		},
	},
	{
		key: PasswordHash.name,
		Class: BcryptPasswordHash,
		parameter: {
			dependencies: [
				{
					concrete: bcrypt,
				},
			],
		},
	},
	{
		key: AuthTokenManager.name,
		Class: JwtTokenManager,
		parameter: {
			dependencies: [
				{
					concrete: Jwt.token,
				},
			],
		},
	},
	{
		key: ThreadRepository.name,
		Class: ThreadRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
				{
					concrete: nanoid,
				},
			],
		},
	},
	{
		key: CommentRepository.name,
		Class: CommentRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
				{
					concrete: nanoid,
				},
			],
		},
	},
	{
		key: ReplyRepository.name,
		Class: ReplyRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
				{
					concrete: nanoid,
				},
			],
		},
	},
	{
		key: LikeRepository.name,
		Class: LikeRepositoryPostgres,
		parameter: {
			dependencies: [
				{
					concrete: pool,
				},
				{
					concrete: nanoid,
				},
			],
		},
	},
])

// registering use cases
container.register([
	{
		key: AddUserUseCase.name,
		Class: AddUserUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'userRepository',
					internal: UserRepository.name,
				},
				{
					name: 'passwordHash',
					internal: PasswordHash.name,
				},
			],
		},
	},
	{
		key: LoginUserUseCase.name,
		Class: LoginUserUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'userRepository',
					internal: UserRepository.name,
				},
				{
					name: 'authRepository',
					internal: AuthRepository.name,
				},
				{
					name: 'authTokenManager',
					internal: AuthTokenManager.name,
				},
				{
					name: 'passwordHash',
					internal: PasswordHash.name,
				},
			],
		},
	},
	{
		key: LogoutUserUseCase.name,
		Class: LogoutUserUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'authRepository',
					internal: AuthRepository.name,
				},
			],
		},
	},
	{
		key: RefreshAuthUseCase.name,
		Class: RefreshAuthUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'authRepository',
					internal: AuthRepository.name,
				},
				{
					name: 'authTokenManager',
					internal: AuthTokenManager.name,
				},
			],
		},
	},
	{
		key: AddThreadUseCase.name,
		Class: AddThreadUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
			],
		},
	},
	{
		key: DetailThreadUseCase.name,
		Class: DetailThreadUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
				{
					name: 'replyRepository',
					internal: ReplyRepository.name,
				},
			],
		},
	},
	{
		key: AddCommentUseCase.name,
		Class: AddCommentUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
			],
		},
	},
	{
		key: DeleteCommentUseCase.name,
		Class: DeleteCommentUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
			],
		},
	},
	{
		key: AddReplyUseCase.name,
		Class: AddReplyUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
				{
					name: 'replyRepository',
					internal: ReplyRepository.name,
				},
			],
		},
	},
	{
		key: DeleteReplyUseCase.name,
		Class: DeleteReplyUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
				{
					name: 'replyRepository',
					internal: ReplyRepository.name,
				},
			],
		},
	},
	{
		key: AddLikeUseCase.name,
		Class: AddLikeUseCase,
		parameter: {
			injectType: 'destructuring',
			dependencies: [
				{
					name: 'threadRepository',
					internal: ThreadRepository.name,
				},
				{
					name: 'commentRepository',
					internal: CommentRepository.name,
				},
				{
					name: 'likeRepository',
					internal: LikeRepository.name,
				},
			],
		},
	},
])

module.exports = container
