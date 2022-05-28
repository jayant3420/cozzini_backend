const Constant = require("../config/constant");
const { CommonHelper } = require("../util/common-helper");
const { JWTHelper } = require("../util/jwt-token-helper");

Authorize = (req, res, next) => {
  try {
    /**
     * Authenticate user using Jwt token auth mechanism
     */
    const accessToken = req.headers["authorization"]
      ? req.headers["authorization"]
      : req.headers["authorization"]
      ? req.headers["authorization"]
      : "";
    req.headers["authorization"] = accessToken;
    if (!accessToken) {
      return CommonHelper.sendError(
        res,
        false,
        Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED,
        "VALIDATION.AUTH_TOKEN_REQUIRED",
        [],
      );
    } else {
      JWTHelper.verify(accessToken)
        .then((decode) => {
          req.user = decode;
          return next();
        })
        .catch((err) => {
          switch (err.name) {
            case "TokenExpiredError":
              return CommonHelper.sendError(
                res,
                false,
                Constant.STATUS_CODE.HTTP_401_UNAUTHORIZED,
                "VALIDATION.TOKEN_EXPIRED",
                [],
              );
            default:
              return CommonHelper.sendError(
                res,
                false,
                Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR,
                "SERVER.SOMETHING_WENT_WRONG",
                [],
              );
          }
        });
    }
  } catch (e) {
    console.log("middleware exception catch ===>>>", e);
    return CommonHelper.sendError(
      res,
      false,
      Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR,
      "SERVER.SOMETHING_WENT_WRONG",
      [],
    );
  }
};

module.exports = {
  Authorize,
};
