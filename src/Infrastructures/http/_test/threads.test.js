// Import dependencies
const pool = require("../../database/postgres/pool");

// Import server and container
const container = require("../../container");
const createServer = require("../createServer");

// Import test helpers
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadsTableTestHelper = require("../../../../tests/ThreadsTableTestHelper");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const CommentsTableTestHelper = require("../../../../tests/CommentsTableTestHelper");
const RepliesTableTestHelper = require("../../../../tests/RepliesTableTestHelper");

describe("/threads endpoint", () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe("POST /threads", () => {
    it("should return 201 and create a new thread", async () => {
      const requestPayload = {
        title: "thread-title-test",
        body: "this is a body for testing thread creation",
      };

      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(201);
      expect(responseJson.status).toBe("success");
      expect(responseJson.data.addedThread).not.toBeUndefined();
    });

    it("should return 200 and thread details", async () => {
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      const currentDate = new Date().toISOString();

      await ThreadsTableTestHelper.addThread({
        id: "thread-123",
        title: "test-thread",
        body: "thread content for testing",
        date: currentDate,
        owner: "user-123",
      });

      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        content: "test comment",
        date: currentDate,
        threadId: "thread-123",
        owner: "user-123",
      });

      await RepliesTableTestHelper.addReply({
        id: "reply-123",
        content: "test reply",
        date: currentDate,
        owner: "user-123",
        thread: "thread-123",
        comment: "comment-123",
      });

      const threadId = "thread-123";

      const response = await server.inject({
        method: "GET",
        url: `/threads/${threadId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toBe("success");
      expect(responseJson.data.thread).not.toBeUndefined();
      expect(responseJson.data.thread.comments).not.toBeUndefined();
      expect(responseJson.data.thread.comments[0].replies).not.toBeUndefined();
    });

    it("should return 400 when required property is missing", async () => {
      const requestPayload = {
        body: "missing title in payload",
      };

      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads`,
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

    it("should return 400 when payload data type is incorrect", async () => {
      const requestPayload = {
        title: "thread-title",
        body: 123456,
      };

      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads`,
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

    it("should return 400 when thread title exceeds character limit", async () => {
      const requestPayload = {
        title:
          "thisisaverylongtitlethatexceedsthemaximumcharacterlimitallowedfortitle",
        body: "testing character limit on title field",
      };

      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      const response = await server.inject({
        method: "POST",
        url: `/threads`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(400);
      expect(responseJson.status).toBe("fail");
      expect(responseJson.message).toBe(
        "tidak dapat membuat thread baru karena karakter melebihi batas limit"
      );
    });
  });
});
