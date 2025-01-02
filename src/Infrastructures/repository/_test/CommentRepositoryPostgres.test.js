const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const AddComment = require("../../../Domains/comments/entities/AddComment");
const CreatedComment = require("../../../Domains/comments/entities/CreatedComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe("CommentRepositoryPostgres", () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({ id: "user-123" });
    await ThreadsTableTestHelper.addThread({ id: "thread-123" });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addComment function", () => {
    it("should persist add comment and return comment correctly", async () => {
      // Arrange
      const addComment = new AddComment({
        content: "dicoding",
        threadId: "thread-123",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "123"; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // action
      await commentRepositoryPostgres.addComment(addComment);

      // Action & Assert
      const comment = await CommentsTableTestHelper.findCommentById(
        "comment-123"
      );
      expect(comment).toHaveLength(1);
    });

    it("should return created comment correctly", async () => {
      // Arrange
      const addComment = new AddComment({
        content: "dicoding",
        threadId: "thread-123",
        owner: "user-123",
      });

      const fakeIdGenerator = () => "123"; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(
        addComment
      );

      // Assert
      expect(addedComment).toStrictEqual(
        new CreatedComment({
          id: "comment-123",
          content: "dicoding",
          owner: "user-123",
        })
      );
    });
  });

  describe("deleteComment function", () => {
    it("should persist delete comment and return comment correctly", async () => {
      // Arrange
      const commentId = "comment-123";
      await CommentsTableTestHelper.addComment({ id: commentId });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await commentRepositoryPostgres.deleteComment(commentId);

      // Action & Assert
      const comment = await CommentsTableTestHelper.findCommentById(
        "comment-123"
      );
      expect(comment[0].is_removed).toEqual(true);
    });
  });

  describe("getCommentById function", () => {
    it("should throw NotFoundError when id not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        commentRepositoryPostgres.getCommentById("comment-123")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return all fields comment when id is found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        content: "dicoding",
        date: "2022-04-19 04:18:51.806",
        threadId: "thread-123",
        owner: "user-123",
      });

      // Action & Assert
      const thread = await commentRepositoryPostgres.getCommentById(
        "comment-123"
      );
      expect(thread.content).toBe("dicoding");
    });
  });

  describe("verifyCommentOwner function", () => {
    it("should throw AuthorizationError when comment not authorize", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        commentRepositoryPostgres.verifyCommentOwner("comment-123", "user-123")
      ).rejects.toThrowError(AuthorizationError);
    });

    it("should return all fields comment when comment is authorize", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        content: "dicoding",
        date: "2022-04-19 04:18:51.806",
        threadId: "thread-123",
        owner: "user-123",
      });

      // Action & Assert
      const thread = await commentRepositoryPostgres.verifyCommentOwner(
        "comment-123",
        "user-123"
      );
      expect(thread.content).toBe("dicoding");
    });
  });

  describe("getCommentByThreadId function", () => {
    it("should throw NotFoundError when id not found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      return expect(
        await commentRepositoryPostgres.getCommentByThreadId("zzz")
      ).toHaveLength(0);
    });

    it("should return all fields comment when id is found", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        content: "dicoding",
        date: "2022-04-19 04:18:51.806",
        threadId: "thread-123",
        owner: "user-123",
      });

      // Action & Assert
      const thread = await commentRepositoryPostgres.getCommentByThreadId(
        "thread-123"
      );
      expect(thread[0].content).toBe("dicoding");
      expect(thread[0]).toEqual({
        id: "comment-123",
        content: "dicoding",
        date: "2022-04-19 04:18:51.806",
        is_removed: false,
        like_count: 0,
        username: "dicoding",
      });
    });
  });

   describe("verifyCommentAvailability function", () => {
     it("should not throw NotFoundError when comment exists", async () => {
       // Arrange
       const commentId = "comment-123";
       await pool.query(
         `INSERT INTO comments (id, content, date, thread_id, owner) VALUES ($1, $2, $3, $4, $5)`,
         [commentId, "content", new Date(), "thread-123", "user-123"]
       );

       const commentRepositoryPostgres = new CommentRepositoryPostgres(
         pool,
         {}
       );

       // Action & Assert
       await expect(
         commentRepositoryPostgres.verifyCommentAvailability(commentId)
       ).resolves.not.toThrow(NotFoundError);
     });

     it("should throw NotFoundError when comment does not exist", async () => {
       // Arrange
       const commentRepositoryPostgres = new CommentRepositoryPostgres(
         pool,
         {}
       );

       // Action & Assert
       await expect(
         commentRepositoryPostgres.verifyCommentAvailability("nonexistent-id")
       ).rejects.toThrow(NotFoundError);
     });
   });
});
