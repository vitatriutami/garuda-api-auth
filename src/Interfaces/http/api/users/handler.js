const autoBind = require("auto-bind");
const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async handlerPostUser(req, h) {
    const useCase = this._container.getInstance(AddUserUseCase.name);

	const payload = req.payload
    const newUser = await useCase.execute(payload);

    // Response
    return h
      .response({
        status: "success",
        data: {
          addedUser: newUser,
        },
      })
      .code(201);
  }
}

module.exports = UsersHandler;
