class CreatedLike {
	constructor(status) {
		this._verifyPayload(status)

		this.status = status
	}

	_verifyPayload(status) {
		if (!status) {
			throw new Error('ADD_LIKE.NOT_CONTAIN_NEEDED_PROPERTY')
		}

		if (typeof status !== 'string') {
			throw new Error('ADD_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION')
		}
	}
}

module.exports = CreatedLike
