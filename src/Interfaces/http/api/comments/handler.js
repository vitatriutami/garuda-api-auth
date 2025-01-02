const autoBind = require("auto-bind");
const AddCommentUseCase = require("../../../../Applications/use_case/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/DeleteCommentUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async handlerPostComment(req, h) {
    const useCase = this._container.getInstance(AddCommentUseCase.name);
    const credentialId = req.auth.credentials.id;
    const { threadId } = req.params;

    const payload = req.payload;
    const newComment = await useCase.execute(payload, threadId, credentialId);

    const response = h.response({
      status: "success",
      data: {
        addedComment: newComment,
      },
    });
    response.code(201);
    return response;
  }

  async handlerDeleteComment(req, h) {
    const useCase = this._container.getInstance(DeleteCommentUseCase.name);

    const credentialId = req.auth.credentials.id;
    const { threadId, commentId } = req.params;

    await useCase.execute(threadId, commentId, credentialId);

    return h
      .response({
        status: "success",
        message: "komentar berhasil dihapus",
      })
      .code(200);
  }
}

module.exports = ThreadsHandler;
