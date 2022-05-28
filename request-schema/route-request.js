const Joi = require("joi");

class RouteRequest {

  /**
   * Method: getRouteStops
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getRouteStops = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  };

  /**
   * Method: getRouteStops
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
   getCompletedRouteStops = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  };
  /**
   * Method: getRouteStops
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
   getSkippedRouteStops = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  };

  /**
   * Method: getIncompletedStops
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getIncompletedStops = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  };


  /**
   * Method: unskippedStops
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  unskippedStops = (res) => {
    return Joi.object().keys({
      orderId: Joi.array().items()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
    });
  }

  /**
   * Method: reassignSkippedStop
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  reassignSkippedStop = (res) => {
    return Joi.object().keys({
      nsOrderId: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      updatedBatchId: Joi.string().required().messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
      })
    })
  }

  /**
   * Method: getRouteByState
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getRouteByState = (res) => {
    return Joi.object().keys({
      stateCode: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }


  /**
   * Method: getOrderbyBatchId
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  getOrderbyBatchId = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }


  /**
   * Method: documentMoveToBatchId
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
   documentMoveToBatchId = (res) => {
    return Joi.object().keys({
      documentNumber: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      updatedBatchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }

  skipStop = (res) => {
    return Joi.object().keys({
      nsOrderId: Joi.number().min(1).required()
        .messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.min': `${res.__('VALIDATION.MINIMUM_VALUE_1')}`
        }),
      skipStopReasonId: Joi.number().required()
        .messages({
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      notes: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      image: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      expectedDeliveryDate: Joi.string().allow("").optional().messages({
        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
      })
    })
  }

  modifyDeliveryWindow = (res) => {
    return Joi.object().keys({
      customerId: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      openTime: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      closeTime: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      openTime1: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      closeTime1: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      dayName: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      notes: Joi.string().allow("")
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        })
    })
  }

  /**
   * Method: delete Order
   * Purpose: JOI request validation
   * @param {*} orderId
   * @returns
   */
  deleteOrder = (res) => {
    return Joi.object().keys({
      orderId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }

  /**
   * Method: getRouteByStateCode
   * Purpose: JOI request validation
   * @param {*} stateCode
   * @returns
   */
  getRouteByStateCode = (res) => {
    return Joi.object().keys({
      stateCode: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }

  /**
   * Method: rerouteOrder
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  rerouteOrder = (res) => {
    return Joi.object().keys({
      moveFrom: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      moveTo: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    })
  }

  /**
   * Method: routesStatus
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  routesStopStatus = (res) => {
    return Joi.object().keys({
      dateTime: Joi.date().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "date.base": `${res.__("VALIDATION.MUST_BE_A_DATE")}`
        }),
      routeId: Joi.string().optional()
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      batchId: Joi.string().optional()
        .messages({
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      stops: Joi.number().optional()
      .messages({
        "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
      }),
      status: Joi.number().optional().min(0).max(1)
      .messages({
        'number.min': `${res.__('VALIDATION.MINIMUM_VALUE_0')}`,
        'number.max': `${res.__('VALIDATION.MAXIMUM_VALUE_1')}`
      })
    })
  }

  changeSequence = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      orders: Joi.array().items(Joi.object().keys({
        nsOrderId: Joi.number().integer().required()
          .messages({
            "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          }),
        routeSequence: Joi.number().integer()
          .messages({
            "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          }),
      }))
    })
  }

  stopDetails = (res) => {
    return Joi.object().keys({
      nsOrderId: Joi.number().integer().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          "number.min": `${res.__("VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG")}`,
        }),
    })
  }

  /**
   * Method: getRouteDetailsAM
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  getRouteDetailsAM = (res) => {
    return Joi.object().keys({
      routeName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: getRouteDayView
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  getRouteDayView = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: getModifyRouteDay
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  getModifyRouteDay = (res) => {
    return Joi.object().keys({
      routeName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: modifyLocationAM
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  modifyLocationAM = (res) => {
    return Joi.object().keys({
      nsCustomerId: Joi.number().integer().min(1).required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
          'number.min': `${res.__('VALIDATION.MINIMUM_VALUE_1')}`
        }),
      latitude: Joi.number().required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
      }),
      longitude: Joi.number().required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
      })
    })
  }

  /**
   * Method: endRoute
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  endRoute = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        }),
      paymentMode: Joi.string().required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
      }),
      amount: Joi.number().required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
      }),
      note: Joi.string().optional().allow("")
      .messages({
        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
      }),
      driverSignature: Joi.string().required()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
      }),
      chequeNumbers: Joi.array().items()
      .messages({
        "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
      })
    })
  }

  /**
   * Method: batchListByBatchId
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  batchListByBatchId = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }

  /**
   * Method: updateAuditTrail
   * Purpose: JOI request validation
   * @param {*} 
   * @returns
   */
  updateAuditTrail = (res) => {
    return Joi.object().keys({
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
        })
    })
  }
}

module.exports.RouteRequest = new RouteRequest(); 
