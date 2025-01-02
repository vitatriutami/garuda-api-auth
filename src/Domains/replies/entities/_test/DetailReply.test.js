const DetailReply = require("../DetailReply");

describe("DetailReply entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "ini content",
      username: "user-123",
    };

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError(
      "REPLY.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: true,
      date: [],
      username: "dicoding",
      is_removed: false,
    };

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError(
      "REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DetailReply object correctly", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "content reply",
      date: "2022-04-23T07:09:31.383+07:00",
      username: "user",
      is_removed: false,
    };

    // Action
    const detailReply = new DetailReply(payload);

    // Assert
    expect(detailReply).toEqual(payload);
  });

  it("should create DetailReply object when comment is deleted correctly", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "content reply",
      date: "2022-04-23T07:09:31.383+07:00",
      username: "user",
      is_removed: true,
    };

    // Action
    const detailReply = new DetailReply(payload);

    // Assert
    expect(detailReply.id).toEqual("reply-123");
    expect(detailReply.content).toEqual("**balasan telah dihapus**");
    expect(detailReply.date).toEqual("2022-04-23T07:09:31.383+07:00");
    expect(detailReply.username).toEqual("user");
    expect(detailReply.is_removed).toEqual(true);
  });

  it("should create DetailReply object when comment is not deleted correctly", () => {
    // Arrange
    const payload = {
      id: "reply-123",
      content: "content reply",
      date: "2022-04-23T07:09:31.383+07:00",
      username: "user",
      is_removed: false,
    };

    // Action
    const detailReply = new DetailReply(payload);

    // Assert
    expect(detailReply).toEqual(payload);
  });
});
