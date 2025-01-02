const autoBind = require("auto-bind");
const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const DetailThreadUseCase = require("../../../../Applications/use_case/DetailThreadUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async handlerPostThread(req, h) {
    const useCase = this._container.getInstance(AddThreadUseCase.name);
    const credentialId = req.auth.credentials.id;
    const newThread = await useCase.execute(req.payload, credentialId);

    const response = h.response({
      status: "success",
      data: {
        addedThread: newThread,
      },
    });
    response.code(201);
    return response;
  }

  async handlerGetDetailThread(req, h) {
    const useCase = this._container.getInstance(DetailThreadUseCase.name);
    const { threadId } = req.params;
    const getThread = await useCase.execute(threadId);

    return h
      .response({
        status: "success",
        data: {
          thread: getThread,
        },
      })
      .code(200);
  }
}

module.exports = ThreadsHandler;
