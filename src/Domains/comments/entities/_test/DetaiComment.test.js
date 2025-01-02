const DetailComment = require("../DetailComment");

describe("a DetailComment entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "dicoding",
      date: "2022-04-21T14:47:50.725+07:00",
      username: "dicoding",
    };

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123123,
      content: "dicoding",
      date: "2022-04-21T14:47:50.725+07:00",
      username: "dicoding",
      like_count: 2,
      replies: [],
    };

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create DetailComment object correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "dicoding",
      date: "2022-04-21T14:47:50.725+07:00",
      username: "dicoding",
      is_removed: false,
      like_count: 2,
      replies: [],
    };

    // Action
    const detailComment = new DetailComment(payload);

    // Assert
     expect(detailComment.id).toEqual(payload.id);
     expect(detailComment.content).toEqual(payload.content);
     expect(detailComment.date).toEqual(payload.date);
     expect(detailComment.username).toEqual(payload.username);
     expect(detailComment.like_count).toEqual(payload.like_count);
     expect(detailComment.replies).toEqual(payload.replies);
  });


  it("should create DetailComment object when comment is deleted correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "dicoding",
      date: "2022-04-21T14:47:50.725+07:00",
      username: "dicoding",
      is_removed: true,
      like_count: 2,
      replies: [],
    };

    // Action
    const { id, content, date, username, replies } = new DetailComment(payload);

    // Assert
    expect(id).toEqual("comment-123");
    expect(content).toEqual("**komentar telah dihapus**");
    expect(date).toEqual("2022-04-21T14:47:50.725+07:00");
    expect(username).toEqual("dicoding");
    expect(replies).toEqual([]);
  });

  it("should create DetailComment object when comment is not deleted correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "dicoding",
      date: "2022-04-21T14:47:50.725+07:00",
      username: "dicoding",
      is_removed: false,
      like_count: 2,
      replies: [],
    };

    // Action
    const detailComment = new DetailComment(payload);

    // Assert
    expect(detailComment.id).toEqual("comment-123");
    expect(detailComment.content).toEqual("dicoding");
    expect(detailComment.date).toEqual("2022-04-21T14:47:50.725+07:00");
    expect(detailComment.username).toEqual("dicoding");
    expect(detailComment.replies).toEqual([]);
  });
});
