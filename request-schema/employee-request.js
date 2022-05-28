const Joi = require("joi");

class EmployeeRequest {

    /**
     * Method: saveDriverHealthLog
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    saveDriverHealthLog = (res) => {
        const items = Joi.object().keys({
            startTime: Joi.date().raw().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'date.base': `${res.__("VALIDATION.MUST_BE_A_DATETIME")}`
                }),
            endTime: Joi.date().raw().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'date.base': `${res.__("VALIDATION.MUST_BE_A_DATETIME")}`
                }),
            steps: Joi.number().min(0).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            isWalking: Joi.number().min(0).max(1).valid(0,1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_BOOLEAN")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`,
                    "number.max": `${res.__("VALIDATION.LENGTH_MUST_BE_LESS_THAN_OR_EQUAL_TO_CHARACTERS_LONG")}`,
                })
        });
        return Joi.object().keys({
            driverHealthLogs: Joi.array().items(items)
        })
    }

}

module.exports.EmployeeRequest = new EmployeeRequest()