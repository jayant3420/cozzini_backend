const Joi = require("joi");

class NotificationRequest {
  /**
   * Method: notificationList
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getNotificationList = (res) => {
    return Joi.object().keys({
      loginType: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        })
    });
  };

  /**
   * Method: getNotificationFilterValueBasedData
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getNotificationFilterValueBasedData = (res) => {
    return Joi.object().keys({
      state: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      routeName: Joi.optional(),
      loginType: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        })
    });
  }

  /**
   * Method: getNotificationOrders
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getNotificationOrders = (res) => {
    return Joi.object().keys({
      state: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      routeName: Joi.optional(),
      nsDriverId: Joi.optional(),
      batchId: Joi.optional()
    });
  }

  /**
   * Method: saveNotifications
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  saveNotifications = (res) => {
    const orderIdList = Joi.object().keys({
      nsOrderId: Joi.number().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        })
    })

    const customerList = Joi.object().keys({
      nsCustomerId: Joi.number().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        })
    })

    return Joi.object().keys({
      message: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      notificationSentTo: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      notificationDate: Joi.optional(),
      day: Joi.optional(),
      orderIdList: Joi.array().items(orderIdList).optional()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      customerList: Joi.array().items(customerList).optional()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    });
  }

/**
 * Method: readNotifications
 * Purpose: JOI request validation
 * @param {*} LangMsg
 * @returns
 */
  readNotifications = (res) => {
    const notificatinList = Joi.object().keys({
      notificationParticipentId: Joi.number().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        }),
      readAt: Joi.date().required()
        .messages({
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })

    return Joi.object().keys({
      notifications: Joi.array().items(notificatinList).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "array.base": `${res.__("VALIDATION.MUST_BE_A_ARRAY")}`
        })
    });
  }

/**
 * Method: getNotificationFilterData
 * Purpose: JOI request validation
 * @param {*} LangMsg
 * @returns
 */
  getNotificationFilterData = (res) => {
    return Joi.object().keys({
      loginType: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        })
    });
  }

  /**
   * Method: getNotificationByBatchId
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getNotificationByBatchId = (res) => {
    return Joi.object().keys({
      routeId: Joi.number().required().min(1)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "number.min": `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        }),
      selectedDate: Joi.string().required()
        .messages({
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    });
  }
}

module.exports.NotificationRequest = new NotificationRequest()