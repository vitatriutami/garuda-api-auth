class AddLike {
	constructor(payload) {
		this._verifyPayload(payload)

		const { threadId, commentId, credentialId } = payload

		this.credentialId = credentialId
		this.commentId = commentId
		this.threadId = threadId
	}

	_verifyPayload({ threadId, commentId, credentialId }) {
		if (!threadId || !commentId || !credentialId) {
			throw new Error('ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY')
		}

		if (
			typeof threadId !== 'string' ||
			typeof commentId !== 'string' ||
			typeof credentialId !== 'string'
		) {
			throw new Error('ADD_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION')
		}
	}
}

module.exports = AddLike
