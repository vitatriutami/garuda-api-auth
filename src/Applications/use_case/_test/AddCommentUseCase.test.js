const CreatedComment = require("../../../Domains/comments/entities/CreatedComment");
const CommentRepository = require("../../../Domains/comments/CommentsRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddCommentUseCase = require("../AddCommentUseCase");

describe("AddCommentUseCase", () => {
  it("should orchestrate the add comment action correctly", async () => {
    // Arrange
    const owner = "user-123";
    const threadId = "thread-123";
    const useCasePayload = {
      content: "dicoding",
    };

    const expectedThread = {
      id: threadId,
      title: "Thread title",
      body: "Thread body",
      date: "2021-08-08T07:19:09.775Z",
      owner: "user-123",
      username: "dicoding",
    };

    const expectedCreatedComment = new CreatedComment({
      id: "comment-123",
      content: useCasePayload.content,
      owner: owner,
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadAvailability = jest.fn(() =>
      Promise.resolve(expectedThread)
    );
    mockCommentRepository.addComment = jest.fn(() =>
      Promise.resolve(
        new CreatedComment({
          id: "comment-123",
          content: useCasePayload.content,
          owner: owner,
        })
      )
    );

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(
      useCasePayload,
      threadId,
      owner
    );

    // Assert
    expect(mockThreadRepository.verifyThreadAvailability).toHaveBeenCalledWith(
      threadId
    );
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(
      expect.objectContaining({
        content: useCasePayload.content,
        threadId: threadId,
        owner: owner,
      })
    );
    expect(addedComment).toStrictEqual(expectedCreatedComment);
  });
});
