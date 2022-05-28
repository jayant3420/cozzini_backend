const Joi = require("joi");

class AuthRequest {
  /**
   * Method: signIn
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  signIn = (res) => {
    return Joi.object().keys({
      email: Joi.string().email().trim().required().max(150)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.email": `${res.__("VALIDATION.MUST_BE_A_VALID_EMAIL")}`,
          "string.empty": `${res.__("VALIDATION.IS_NOT_ALLOWED_TO_BE_EMPTY")}`,
          "string.max": `${res.__("VALIDATION.LENGTH_MUST_BE_LESS_THAN_OR_EQUAL_TO_CHARACTERS_LONG")}`,
          // 'string.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`,
        }),
      password: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      deviceType: Joi.string().required().valid("WEB", "ANDROID", "IOS").max(20)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.max": `${res.__("VALIDATION.LENGTH_MUST_BE_LESS_THAN_OR_EQUAL_TO_CHARACTERS_LONG")}`,
          "any.only": `${res.__("VALIDATION.ONLY_ALLOW")}`,
        }),
      deviceToken: Joi.string().max(255).optional().allow("")
        .messages({
          "string.max": `${res.__("VALIDATION.LENGTH_MUST_BE_LESS_THAN_OR_EQUAL_TO_CHARACTERS_LONG")}`,
        }),
      loginType: Joi.number().required().min(1).max(6)
        .messages({
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  };


  /**
   * Method: getUserProfile
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getUserProfile = (res) => {
    return Joi.object().keys({
      employeeType: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }


  /**
   * Method: changePassword
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  changePassword = (res) => {
    return Joi.object().keys({
      oldPassword: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      newPassword: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }

  /**
   * Method: getEmails
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getEmails = (res) => {
    return Joi.object().keys({
      routeName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }


  /**
   * Method: updateEmail
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  updateEmail = (res) => {
    return Joi.object().keys({
      nsEmployeeId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      newEmail: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }

  /**
   * Method: azureSasToken
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  azureSasToken = (res) => {
    return Joi.object().keys({
      containerName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      imageName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }
}

module.exports.AuthRequest = new AuthRequest();
