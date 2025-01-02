const AddThread = require("../../../Domains/threads/entities/AddThread");
const CreatedThread = require("../../../Domains/threads/entities/CreatedThread");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("AddThreadUseCase", () => {
  it("should orchestrate the add thread action correctly", async () => {
    // Arrange
    const owner = "user-123";
    const useCasePayload = {
      title: "dicoding",
      body: "ini body testing",
      owner: owner,
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn(() =>
      Promise.resolve(
        new CreatedThread({
          id: "thread-123",
          title: useCasePayload.title,
          owner: owner,
        })
      )
    );

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(
      useCasePayload,
      useCasePayload.owner
    );

    // Assert
    expect(addedThread).toStrictEqual(
      new CreatedThread({
        id: "thread-123",
        title: useCasePayload.title,
        owner: owner,
      })
    );
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      })
    );
  });
});
