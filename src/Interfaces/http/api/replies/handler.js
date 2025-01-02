const autoBind = require("auto-bind");
const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase");
const DeleteReplyUseCase = require("../../../../Applications/use_case/DeleteReplyUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async handlerPostReply(req, h) {
    const useCase = this._container.getInstance(AddReplyUseCase.name);
    const credentialId = req.auth.credentials.id;
    const { threadId, commentId } = req.params;

    const payload = req.payload;
    const newReply = await useCase.execute(
      payload,
      credentialId,
      threadId,
      commentId
    );

    return h
      .response({
        status: "success",
        data: {
          addedReply: newReply,
        },
      })
      .code(201);
  }

  async handlerDeleteReply(req, h) {
    const useCase = this._container.getInstance(DeleteReplyUseCase.name);
    const credentialId = req.auth.credentials.id;

    const { threadId, commentId, replyId } = req.params;

    await useCase.execute(threadId, commentId, replyId, credentialId);

    const response = h.response({
      status: "success",
      message: "berhasil menghapus balasan komentar",
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
