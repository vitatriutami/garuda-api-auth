const pool = require("../../database/postgres/pool");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const container = require("../../container");
const createServer = require("../createServer");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("POST /threads", () => {
    it("should respond with 201 and persist the comment", async () => {
      const requestPayload = { content: "dicoding1" };
      const threadId = "thread-123";
      const accessToken = await ServerTestHelper.getAccessToken();

      await ThreadsTableTestHelper.addThread({ id: threadId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedComment).toBeDefined();
    });

    it("should respond with 400 when payload is missing required properties", async () => {
      const requestPayload = {};
      const threadId = "thread-123";
      const accessToken = await ServerTestHelper.getAccessToken();

      await ThreadsTableTestHelper.addThread({ id: threadId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "harus mengirimkan payload dengan properti yang lengkap"
      );
    });

    it("should respond with 400 when payload has invalid data type", async () => {
      const requestPayload = { content: 123123 };
      const threadId = "thread-123";
      const accessToken = await ServerTestHelper.getAccessToken();

      await ThreadsTableTestHelper.addThread({ id: threadId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("setiap payload harus bertipe string");
    });
  });

  describe("DELETE /threads/{threadId}/comments/{commentId}", () => {
    it("should respond with 200 and successfully delete the comment", async () => {
      const threadId = "thread-123";
      const commentId = "comment-123";
      const accessToken = await ServerTestHelper.getAccessToken();

      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: commentId });
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.message).toBeDefined();
    });

    it("should respond with 404 when comment id does not exist", async () => {
      const threadId = "thread-123";
      const commentId = "invalid-comment";
      const accessToken = await ServerTestHelper.getAccessToken();

      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: "comment-123" });
      const server = await createServer(container);

      const response = await server.inject({
        method: "DELETE",
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("Comment id tidak ditemukan");
    });
  });
});
