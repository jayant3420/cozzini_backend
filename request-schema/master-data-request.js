const Joi = require("joi");

class MasterDataRequest {
  /**
   * Method: getSurveyQuestion
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getSurveyQuestion = (res) => {
    return Joi.object().keys({
      surveyId: Joi.number().integer().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        })
    })
  }

  masterSavePayment = (res) => {
    return Joi.object().keys({
      allSavePaymentData: Joi.array().items(Joi.object().keys({
        nsOrderId: Joi.number().messages({
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
        }),
        paymentMode: Joi.number().allow(0, 1, 2).required().messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
        signatureImage: Joi.string().allow('').optional().messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
        contactId: Joi.number().integer().optional().messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
        }),
        collectedAmount: Joi.number().allow(0).optional().messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
        }),
        outstandingAmount: Joi.number().allow(0).optional().messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
        }),
        noPayementCollected: Joi.number().allow(0, 1).required().messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
        invoices: Joi.array().items(Joi.object().keys({
          nsDocumentNumber: Joi.string().required().messages({
            "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
            "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
          })
        })),
        checkNumber: Joi.array().items(Joi.string().optional()),
        textNote: Joi.string().optional().allow('').messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      }))
    })
  }
}

module.exports.MasterDataRequest = new MasterDataRequest();
