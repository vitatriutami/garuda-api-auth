const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
// const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
// const AddThread = require("../../../Domains/threads/entities/AddThread");
// const CreatedThread = require("../../../Domains/threads/entities/CreatedThread");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
// const NotFoundError = require("../../../Commons/exceptions/NotFoundError");

describe("ThreadRepositoryPostgres", () => {
  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({
      id: "user-123",
      username: "dicoding",
    });
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("getThreadById", () => {
    it("should return all fields threads when id is found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await ThreadsTableTestHelper.addThread({
        id: "thread-123",
        title: "dicoding",
        body: "ini body thread",
        date: new Date().toISOString(),
        owner: "user-123",
      });

      // Action
      const thread = await threadRepositoryPostgres.getThreadById("thread-123");

      // Assert
      expect(thread).toEqual({
        id: "thread-123",
        title: "dicoding",
        body: "ini body thread",
        owner: "user-123",
        date: expect.any(String),
        username: "dicoding",
      });
    });

    it("should throw NotFoundError when thread id format is invalid", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.getThreadById("123")
      ).rejects.toThrowError("Thread tidak ditemukan");
    });

    it("should throw NotFoundError when thread id does not exist", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.getThreadById("non-existent-id")
      ).rejects.toThrowError("Thread tidak ditemukan");
    });
  });

  describe("verifyThreadAvailability", () => {
    it("should return thread details when thread id is found", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await ThreadsTableTestHelper.addThread({
        id: "thread-123",
        title: "dicoding",
        body: "ini body thread",
        date: new Date().toISOString(),
        owner: "user-123",
      });

      // Action
      const thread = await threadRepositoryPostgres.verifyThreadAvailability(
        "thread-123"
      );

      // Assert
      expect(thread).toEqual({
        id: "thread-123",
        title: "dicoding",
        body: "ini body thread",
        owner: "user-123",
        date: expect.any(String),
        username: "dicoding",
      });
    });
    it("should throw NotFoundError when thread id does not exist", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(
        threadRepositoryPostgres.verifyThreadAvailability("non-existent-id")
      ).rejects.toThrowError("Thread tidak ditemukan");
    });
  });
});
