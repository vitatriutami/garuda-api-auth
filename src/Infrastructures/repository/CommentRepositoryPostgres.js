const CreatedComment = require("../../Domains/comments/entities/CreatedComment");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const CommentsRepository = require("../../Domains/comments/CommentsRepository");

class CommentRepositoryPostgres extends CommentsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payloadThread) {
    const { content, threadId, owner } = payloadThread;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date();

    const query = {
      text: `INSERT INTO "comments" VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner`,
      values: [id, content, date, threadId, owner],
    };

    const result = await this._pool.query(query);

    return new CreatedComment({ ...result.rows[0] });
  }

  async deleteComment(commentId) {
    const query = {
      text: `UPDATE "comments" SET is_removed=true WHERE id=$1`,
      values: [commentId],
    };

    await this._pool.query(query);
  }

  async getCommentById(commentId) {
    const query = {
      text: `SELECT * FROM comments WHERE id=$1`,
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Comment id tidak ditemukan");
    }

    return result.rows[0];
  }

  async verifyCommentOwner(commentId, owner) {
    const query = {
      text: `SELECT * FROM comments WHERE id=$1 AND owner=$2`,
      values: [commentId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError(
        "Anda tidak memiliki akses untuk comment ini"
      );
    }

    return result.rows[0];
  }

  async getCommentByThreadId(threadId) {
    const queryComment = {
      text: `SELECT commen.id, commen.content, commen.date, users.username, commen.is_removed, CAST(COUNT(likes.id) AS INTEGER) AS like_count
          FROM comments AS commen
          LEFT JOIN users ON commen.owner = users.id
          LEFT JOIN likes ON commen.id = likes.comment_id 
          WHERE commen.thread_id = $1 GROUP BY commen.id, users.id ORDER BY commen.date ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(queryComment);

    if (!result.rowCount) {
      return [];
    }

    return result.rows;
  }

  async verifyCommentAvailability(commentId) {
    const query = {
      text: `SELECT id FROM comments WHERE id = $1`,
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Komentar tidak ditemukan");
    }
  }
}
module.exports = CommentRepositoryPostgres;
