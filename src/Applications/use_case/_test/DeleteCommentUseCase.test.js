const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentsRepository = require("../../../Domains/comments/CommentsRepository");
const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe("DeleteCommentUseCase", () => {
  it("should throw error if use case payload not contain parameter", async () => {
    // Arrange
    const paramCommentId = "";
    const paramThreadId = "";
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute(paramCommentId, paramThreadId)
    ).rejects.toThrowError("DELETE_THREAD_USE_CASE.NOT_CONTAIN_PARAMETER");
  });

  it("should throw error if commentId not string", async () => {
    // Arrange
    const paramCommentId = 123;
    const paramThreadId = "thread-123";
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute(paramCommentId, paramThreadId)
    ).rejects.toThrowError(
      "DELETE_THREAD_USE_CASE.PARAMETER_NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should orchestrating the delete comment action correctly", async () => {
    // Arrange
    const paramCommentId = "comment-123";
    const paramThreadId = "thread-123";
    const paramOwnerId = "user-123";
    const mockThreadRepository = new ThreadRepository();
    const mockCommentsRepository = new CommentsRepository();

    mockCommentsRepository.verifyCommentOwner = jest.fn(() =>
      Promise.resolve()
    );
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve());
    mockCommentsRepository.getCommentById = jest.fn(() => Promise.resolve());
    mockCommentsRepository.deleteComment = jest.fn(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentsRepository,
    });

    // Act
    await deleteCommentUseCase.execute(
      paramCommentId,
      paramThreadId,
      paramOwnerId
    );

    // Assert
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(
      paramCommentId
    );
    expect(mockCommentsRepository.getCommentById).toHaveBeenCalledWith(
      paramThreadId
    );
    expect(mockCommentsRepository.verifyCommentOwner).toHaveBeenCalledWith(
      paramThreadId,
      paramOwnerId
    );
    expect(mockCommentsRepository.deleteComment).toHaveBeenCalledWith(
      paramThreadId
    );
  });
});
