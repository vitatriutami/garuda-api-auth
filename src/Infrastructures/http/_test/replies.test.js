const pool = require("../../database/postgres/pool");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const RepliesTableTestHelper = require("../../../../tests/RepliesTableTestHelper");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const container = require("../../container");
const createServer = require("../createServer");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("POST /threads/{threadId}/comments/{commentId}/replies", () => {
    it("should respond with 201 and persist the reply", async () => {
      const requestPayload = {
        content: "test-reply-content",
      };
      const threadId = "thread-123";
      const commentId = "comment-123";

      const accessToken = await ServerTestHelper.getAccessToken();
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(201);
      expect(responseJson.status).toBe("success");
      expect(responseJson.data.addedReply).not.toBeUndefined();
    });

    it("should respond with 400 when payload is missing required properties", async () => {
      const requestPayload = {};
      const threadId = "thread-123";
      const commentId = "comment-123";

      const accessToken = await ServerTestHelper.getAccessToken();
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(400);
      expect(responseJson.status).toBe("fail");
      expect(responseJson.message).toBe(
        "harus mengirimkan payload dengan properti yang lengkap"
      );
    });

    it("should respond with 400 when payload has incorrect data types", async () => {
      const requestPayload = {
        content: 12345,
      };
      const threadId = "thread-123";
      const commentId = "comment-123";

      const accessToken = await ServerTestHelper.getAccessToken();
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(400);
      expect(responseJson.status).toBe("fail");
      expect(responseJson.message).toBe("setiap payload harus bertipe string");
    });
  });

  describe("DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}", () => {
    it("should respond with 200 and successfully delete the reply", async () => {
      const threadId = "thread-123";
      const commentId = "comment-123";
      const replyId = "reply-123";

      const accessToken = await ServerTestHelper.getAccessToken();
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      await RepliesTableTestHelper.addReply({ id: replyId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toBe("success");
      expect(responseJson.message).not.toBeUndefined();
    });

    it("should respond with 404 when replyId does not exist", async () => {
      const threadId = "thread-123";
      const commentId = "comment-123";
      const replyId = "nonexistent-reply";

      const accessToken = await ServerTestHelper.getAccessToken();
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      await RepliesTableTestHelper.addReply({ id: "reply-123" });
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(404);
      expect(responseJson.status).toBe("fail");
      expect(responseJson.message).toBe("Reply id tidak ditemukan");
    });
  });
});
