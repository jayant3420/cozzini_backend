const Joi = require("joi");

class VehicleRequest {
  /**
   * Method: vehicleInspection
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
  vehicleInspection = (res) => {
    return Joi.object().keys({
      vehicleId: Joi.number().integer().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      data: Joi.array().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        }),
      remarks: Joi.string().optional(),
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        })
    });
  };

  logStartEndTime = (res) => {
    return Joi.object().keys({
      requestType: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        }),
      batchId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
        })
    });
  };

  addVehicle = (res) => {
    return Joi.object().keys({
      vinNumber: Joi.string().required().length(17)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.length" : `${res.__("VALIDATION.VIN_NUMBER_17_CHARACTERS_LONG")}`
        }),
      vehicleName: Joi.string().required().length(6)
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.length" : `${res.__("VALIDATION.VEHICLE_NAME_6_CHARACTERS_LONG")}`
        })
    });
  }

  deleteVehicle = (res) => {
    return Joi.object().keys({
      vehicleId: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        })
    });
  }

  saveVehicleAM = (res) => {
    return Joi.object().keys({
      vinNumber: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      vehicleName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
        }),
      routeName: Joi.optional(),
      driverName: Joi.optional(),
      year: Joi.optional(),
      make: Joi.optional(),
      model: Joi.optional(),
      series: Joi.optional(),
      licenseState: Joi.optional(),
      licenseNum: Joi.optional(),
      licenseExpDate: Joi.optional(),
      fleetVehicleStatus: Joi.optional()
    });
  }

  vehicleNickname = (res) => {
    return Joi.object().keys({
      vehicleId: Joi.number().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
        }),
      nickName: Joi.string().required()
        .messages({
          "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
          "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
        })
    });
  }

}

module.exports.VehicleRequest = new VehicleRequest();
