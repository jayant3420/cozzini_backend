const Joi = require("joi");

class SurveyRequest {

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

  /**
   * Method: saveSurveyAnswer
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  saveSurveyAnswer = (res) => {
    const items = Joi.object().keys({
      questionId: Joi.number().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        }),
      questionOptionId: Joi.number().integer().optional().allow(null, 0)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      textAnswer: Joi.string().optional().allow('').messages({
        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
      })
    });

    return Joi.object().keys({
      nsEmployeeId: Joi.number().integer().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        }),
      nsCustomerId: Joi.number().integer().min(1).required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
        'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
      }),
      surveyId: Joi.string().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        }),
      surveyQuestionAnswer: Joi.array().items(items),
    })
  }

  /**
   * Method: getSurveyDetailAM
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getSurveyDetailAM = (res) => {
    return Joi.object().keys({
      nsCustomerId: Joi.number().integer().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
        })
    })
  }

  /**
   * Method: createSurvey
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  createSurvey = (res) => {
    const items = Joi.object().keys({
      answerType: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      questionText: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      options: Joi.optional()
    });
    return Joi.object().keys({
      surveyName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      questionAnswer: Joi.array().items(items).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: updateSurvey
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  updateSurvey = (res) => {
    const items = Joi.object().keys({
      questionId: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      answerType: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      questionText: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      isAdded: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      isRemoved: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      options: Joi.optional()
    });
    return Joi.object().keys({
      surveyId: Joi.number().required()
          .messages({
            "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
          }),
      surveyName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      questionAnswer: Joi.array().items(items).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: pastSurvey
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  pastSurvey = (res) => {
    return Joi.object().keys({
      nsCustomerId: Joi.number().optional().allow('')
          .messages({
            "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
          }),
      routeId: Joi.number().optional().allow('')
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      startDate: Joi.string().optional().allow('')
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      endDate: Joi.string().optional().allow('')
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: getSurveyById
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getSurveyById = (res) => {
    return Joi.object().keys({
      driverSurveyId: Joi.number().required()
          .messages({
            "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
          })
    })
  }
}

module.exports.SurveyRequest = new SurveyRequest();
