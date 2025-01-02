class DetailReply {
	constructor(payload) {
		this._verifyPayload(payload)

		const { id, content, date, username, is_removed } = payload

		this.id = id
		this.content = is_removed ? '**balasan telah dihapus**' : content
		this.date = date
		this.username = username
		this.is_removed = is_removed
		
	}

	_verifyPayload({ id, content, date, username, is_removed }) {
		if (!id || !content || !date || !username) {
			throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY')
		}

		if (
			typeof id !== 'string' ||
			typeof content !== 'string' ||
			typeof username !== 'string' ||
			typeof is_removed !== 'boolean'
		) {
			throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION')
		}
	}
}

module.exports = DetailReply