class DetailComment {
	constructor(payload) {
		this._verifyPayload(payload)

		const {
			id,
			content,
			date,
			username,
			is_removed,
			replies,
			like_count,
		} = payload

		this.id = id
		this.content = is_removed ? '**komentar telah dihapus**' : content
		this.date = date
		this.username = username
		this.replies = replies
		this.like_count = like_count
	}

	_verifyPayload({
		id,
		content,
		date,
		username,
		is_removed,
		replies,
		like_count,
	}) {
		if (!id || !content || !date || !username || !replies) {
			throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
		}

		if (
			typeof id !== 'string' ||
			typeof content !== 'string' ||
			typeof username !== 'string' ||
			typeof is_removed !== 'boolean' ||
			!(replies instanceof Array) ||
			typeof like_count !== 'number'
		) {
			throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
		}
	}
}

module.exports = DetailComment
