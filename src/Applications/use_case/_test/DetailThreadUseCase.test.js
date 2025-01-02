const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentsRepository");
const ReplyRepository = require("../../../Domains/replies/ReplyRepository");
const DetailThreadUseCase = require("../DetailThreadUseCase");
const CommentDetail = require("../../../Domains/comments/entities/DetailComment");
const ReplyDetail = require("../../../Domains/replies/entities/DetailReply");

describe("DetailThreadUseCase", () => {
  it("should orchestrate the get thread action correctly", async () => {
    // Arrange
    const threadId = "thread-123";

    const expectedThreadDetails = {
      id: threadId,
      title: "dicoding",
      body: "Dicoding-Indonesia",
      date: "2021-08-08T07:19:09.775Z",
      username: "dicoding",
      comments: [
        new CommentDetail({
          id: "comment-123",
          username: "dicoding",
          date: "2021-08-08T07:22:33.555Z",
          content: "sebuah comment",
          is_removed: false,
          like_count: 0,
          replies: [
            new ReplyDetail({
              id: "reply-123",
              content: "Hai, apa kabar",
              date: "2021-08-08T07:22:33.555Z",
              username: "dicoding",
              is_removed: true,
            }),
          ],
        }),
        new CommentDetail({
          id: "comment-124",
          username: "dicoding",
          date: "2021-08-08T07:22:33.555Z",
          content: "comment",
          is_removed: true,
          like_count: 0,
          replies: [
            new ReplyDetail({
              id: "reply-124",
              content: "Test reply",
              date: "2021-08-08T07:22:33.555Z",
              username: "dicoding",
              is_removed: false,
            }),
          ],
        }),
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn(() =>
      Promise.resolve({
        id: "thread-123",
        title: "dicoding",
        body: "Dicoding-Indonesia",
        date: "2021-08-08T07:19:09.775Z",
        username: "dicoding",
      })
    );

    mockCommentRepository.getCommentByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "comment-123",
          thread_id: "thread-123",
          username: "dicoding",
          date: "2021-08-08T07:22:33.555Z",
          content: "sebuah comment",
          is_removed: false,
          like_count: 0,
        },
        {
          id: "comment-124",
          thread_id: "thread-123",
          content: "comment",
          date: "2021-08-08T07:22:33.555Z",
          username: "dicoding",
          is_removed: true,
          like_count: 0,
        },
      ])
    );

    mockReplyRepository.getRepliesByThreadId = jest.fn(() =>
      Promise.resolve([
        {
          id: "reply-123",
          comment_id: "comment-123",
          content: "Hai, apa kabar",
          date: "2021-08-08T07:22:33.555Z",
          username: "dicoding",
          is_removed: true,
        },
        {
          id: "reply-124",
          comment_id: "comment-124",
          content: "Test reply",
          date: "2021-08-08T07:22:33.555Z",
          username: "dicoding",
          is_removed: false,
        },
      ])
    );

    /** creating use case instance */
    const getThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const gettedThread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(gettedThread).toEqual(expectedThreadDetails);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(threadId);

    // Ensure mock functions are called the correct number of times
    expect(mockThreadRepository.getThreadById).toBeCalledTimes(1);
    expect(mockCommentRepository.getCommentByThreadId).toBeCalledTimes(1);
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledTimes(1);
  });
});
