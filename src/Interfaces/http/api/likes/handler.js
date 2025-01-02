const autoBind = require("auto-bind");
const AddLikeUseCase = require("../../../../Applications/use_case/AddLikeUseCase");

class LikesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async handlerAddLike(req, h) {
    const useCase = this._container.getInstance(AddLikeUseCase.name);
    const credentialId = req.auth.credentials.id;
   
	const { threadId, commentId } = req.params;

    const status = await useCase.execute(threadId, commentId, credentialId);

    return h.response(status).code(200);
  }
}

module.exports = LikesHandler;
