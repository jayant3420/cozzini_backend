const Joi = require("joi");

class CustomerRequest {
    /**
     * Method: getCustomers
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomers = (res) => {
        return Joi.object().keys({
            pageNo: Joi.number().integer().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            pageSize: Joi.number().integer().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                })
        })
    }

    /**
     * Method: getCustomers
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    locationChangeRequest = (res) => {
        return Joi.object().keys({
            // nsEmployeeId: Joi.number().integer().min(1).required()
            //     .messages({
            //         "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
            //         'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
            //         'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
            //     }),
            nsCustomerId: Joi.number().integer().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            latitude: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            longitude: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })

        })
    }

    /**
     * Method: getCustomerContacts
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomerContacts = (res) => {
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
     * Method: getCustomerById
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomerById = (res) => {
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
     * Method: addCustomerContact
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    addCustomerContact = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            contactName: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            contactSignature: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        })
    }

    /**
     * Method: getCustomerByRouteName
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomerByRouteName = (res) => {
        return Joi.object().keys({
            nsRouteId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                })
        })
    }

    /**
     * Method: getCustomerNote
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomerNote = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                })
        })
    }

    /**
     * Method: updateCustomerNote
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    updateCustomerNote = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            note: Joi.string().optional()
                .messages({
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        })
    }

    deleteCustomerContact = (res) => {
        return Joi.object().keys({
            contactId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
        })
    }

    emailInvoices = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            email: Joi.string().email().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.email": `${res.__('VALIDATION.MUST_BE_A_VALID_EMAIL')}`
                }),
            invoices: Joi.array().items(Joi.object().keys({
                nsDocumentNumber: Joi.string().required()
                    .messages({
                        "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                        "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    })
            })),
        })
    }

    customerDetailsAM = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        })
    }

    /**
     * Method: addCustomerCard
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    addCustomerCard = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            cardNumber: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            cardBrand: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            cardType: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            expirationDate: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            nameOnCard: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            card4Digit: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            zipCode: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            street: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            state: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            memo: Joi.string().optional().allow('')
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            isDefault: Joi.boolean().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "boolean.base": `${res.__("VALIDATION.MUST_BE_A_BOOLEAN")}`
                })
        })
    }

    /**
     * Method: driverTodayReport
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    driverTodayReport = (res) => {
        return Joi.object().keys({
            reportDate: Joi.string().messages({
                "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`
            })
        })
    }

    /**
     * Method: getCustomerSurvey
     * Purpose: JOI request validation
     * @param {*} LangMsg
     * @returns
     */
    getCustomerSurvey = (res) => {
        return Joi.object().keys({
            nsCustomerId: Joi.number().min(1).messages({
                "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                "number.min": `${res.__('VALIDATION.MINIMUM_VALUE_1')}`
            }),
            surveyId: Joi.number().min(1).messages({
                "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                "number.min": `${res.__('VALIDATION.MINIMUM_VALUE_1')}`
            })
        })
    }
}

module.exports.CustomerRequest = new CustomerRequest()