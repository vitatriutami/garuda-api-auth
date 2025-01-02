const autoBind = require("auto-bind");
const LoginUserUseCase = require("../../../../Applications/use_case/LoginUserUseCase");
const RefreshAuthUseCase = require("../../../../Applications/use_case/RefreshAuthUseCase");
const LogoutUserUseCase = require("../../../../Applications/use_case/LogoutUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;
    autoBind(this);
  }

  async handlerPostAuth(req, h) {
    const useCase = this._container.getInstance(LoginUserUseCase.name);

    const payload = req.payload;
    const { accessToken, refreshToken } = await useCase.execute(payload);

    const response = h.response({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async handlerPutAuth(req) {
    const useCase = this._container.getInstance(
      RefreshAuthUseCase.name
    );

	const payload = req.payload
    const accessToken = await useCase.execute(payload);

    return {
      status: "success",
      data: {
        accessToken,
      },
    };
  }

  async handlerDeleteAuth(req) {
    const useCase = this._container.getInstance(
      LogoutUserUseCase.name
    );
    await useCase.execute(req.payload);
    return {
      status: "success",
    };
  }
}

module.exports = AuthenticationsHandler;
