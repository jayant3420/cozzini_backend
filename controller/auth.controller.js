"use strict";
const Constant = require("../config/constant");
const bcrypt = require("bcryptjs");
const { AuthRequest } = require("../request-schema/auth-request");
const { AuthModel } = require("../model/auth");
const { CommonHelper } = require("../util/common-helper");
const { JWTHelper } = require("../util/jwt-token-helper");
const { SALT_ROUNDS } = require("../config/constant")

class AuthController {
  /**
   * Method: signIn
   * Purpose: sign in user using username and password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  signIn = async (req, res) => {
    try {
      const input = req.body;
      // console.log("----input----", input);
      const { error, value } = await AuthRequest.signIn(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const employeeEmail = input.email;
      const response = await AuthModel.getPassword(employeeEmail).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const hashRes = await CommonHelper.hashingComparePassword(value.password, response.data);
      if (!hashRes) {
        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INCORRECT_PASSWORD', []);
      } else {
        const response = await AuthModel.signIn(value).catch((err) => {
          switch (err) {
            case "INVALID_USER":
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
            // case 'INVALID_REQUEST':
            //     return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
            default:
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        });

        if (!response) { return; }

        // Generate token
        const tokens = JWTHelper.generateToken({
          email: response[0].email,
          nsEmployeeId: response[0].nsEmployeeId,
          firstName: response[0].firstName,
          middleName: response[0].middleName,
          lastName: response[0].lastName
        }, Constant.JWT.TOKEN_LIFE, true);

        response[0]["accessToken"] = tokens.accessToken;
        response[0]["refreshToken"] = tokens.refreshToken;
        // delete response[0]['password']
        const encryptedRefreshToken = await CommonHelper.getHashText(tokens.refreshToken);

        //Save refresh token to DB.
        await AuthModel.saveRefreshToken({
          nsEmployeeId: response[0].nsEmployeeId,
          refreshToken: encryptedRefreshToken,
          deviceToken: input.deviceToken,
          deviceType: input.deviceType,
        }).catch((err) => {
          console.log("Save catch err >> ", err);
        });

        return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
      }
    } catch (e) {
      console.log("Login catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: changePassword
   * Purpose: To change the user password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  changePassword = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await AuthRequest.changePassword(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const employeeEmail = req.user.email;
      const response = await AuthModel.getPassword(employeeEmail).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
      const hashRes = await CommonHelper.hashingComparePassword(value.oldPassword, response.data);
      if (!hashRes) {
        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_OLD_PASSWORD', []);
      } else {
        bcrypt.hash(value.newPassword, SALT_ROUNDS, async (err, hash) => {
          if (err) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          } else {
            const response = await AuthModel.changePassword(hash, employeeEmail).catch((err) => {
              switch (err) {
                case "INVALID_USER":
                  return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
                default:
                  return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
              }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.PASSWORD_SUCCESSFULLY_CHANGED");
          }
        })
      }
    } catch (e) {
      console.log("Change Password error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getEmails
   * Purpose: To get the emails of area_manager and driver
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getEmails = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await AuthRequest.getEmails(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await AuthModel.getEmails(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const formatResponse = []
      response.forEach((item) => {
        formatResponse.push(item[0])
      })

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", formatResponse);

    } catch (e) {
      console.log("Change Password error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: updateEmail
   * Purpose: To get the emails of area_manager and driver
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateEmail = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await AuthRequest.updateEmail(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await AuthModel.updateEmail(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.EMAIL_UPDATE_SUCCESSFULL", []);

    } catch (e) {
      console.log("Change Password error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getEmails
   * Purpose: To get the emails of area_manager and driver
   * @param {*} req
   * @param {*} res
   * @returns
   */
  azureSasToken = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await AuthRequest.azureSasToken(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CommonHelper.generateSasToken(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);

    } catch (e) {
      console.log("Change Password error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }
}

module.exports = new AuthController();
