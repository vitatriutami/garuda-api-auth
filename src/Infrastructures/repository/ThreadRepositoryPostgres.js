const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const CreatedThread = require("../../Domains/threads/entities/CreatedThread");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(payloadThread) {
    const { title, body, owner } = payloadThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date();

    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, body, date, owner",
      values: [id, title, body, date, owner],
    };

    const result = await this._pool.query(query);

    return new CreatedThread({ ...result.rows[0] });
  }

  async getThreadById(threadId) {
    const query = {
      text: `
      SELECT threads.id, threads.title, threads.body, threads.date, threads.owner, users.username
      FROM threads
      LEFT JOIN users ON threads.owner = users.id
      WHERE threads.id = $1
    `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Thread tidak ditemukan");
    }

    return result.rows[0];
  }

  async verifyThreadAvailability(threadId) {
    const query = {
      text: `
      SELECT threads.id, threads.title, threads.body, threads.date, threads.owner, users.username
      FROM threads
      LEFT JOIN users ON threads.owner = users.id
      WHERE threads.id = $1
    `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Thread tidak ditemukan");
    }

    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostgres;
