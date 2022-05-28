const Joi = require("joi");

class ReportRequest {
    // /**
    //  * Method: dashboardCountReport
    //  * Purpose: JOI request validation
    //  * @param {*} LangMsg
    //  * @returns
    //  */
    // dashboardCountReport = (res) => {
    //   return Joi.object().keys({

    //   });
    // };

    /**
     * Method: eodReportBatchId
    * Purpose: JOI request validation
    * @param {*} batchId
    * @returns
    */
    eodReportBatchId = (res) => {
        return Joi.object().keys({
            batchId: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        });
    }

    /**
    * Method: eodReportRouteName
    * Purpose: JOI request validation
    * @param {*} routeName
    * @returns
    */
    eodReportRouteName = (res) => {
        return Joi.object().keys({
            routeName: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        });
    }

    /**
    * Method: paymentReport
    * Purpose: JOI request validation
    * @param {*} batchId
    * @returns
    */
    paymentReport = (res) => {
        return Joi.object().keys({
            batchId: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        });
    }

    /**
    * Method: deliveryWindowCS
    * Purpose: JOI request validation
    * @param {*} batchId
    * @returns
    */
    deliveryWindowCS = (res) => {
        return Joi.object().keys({
            weekType: Joi.number().optional()
                .messages({
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }

    /**
    * Method: deliveryWindowAM
    * Purpose: JOI request validation
    * @param {*} batchId
    * @returns
    */
    deliveryWindowAM = (res) => {
        return Joi.object().keys({
            weekType: Joi.number().optional()
                .messages({
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }

    /**
      * Method: openRestaurrantsForm
      * Purpose: JOI request validation
      * @param {*} 
      * @returns
      */
    openRestaurrantsForm = (res) => {
        const knifeItems = Joi.object().keys({
            nsItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            quantity: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            amount: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isAdded: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isRemoved: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            boxId: Joi.number().optional().allow(0)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });

        const programItems = Joi.object().keys({
            nsItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            quantity: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            amount: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isAdded: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isRemoved: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nextDeliveryDate: Joi.string().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            frequency: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        });

        return Joi.object().keys({
            openRestaurrantId: Joi.number().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            businessForm: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingName: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingAddress: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingCity: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingState: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingZipCode: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            phoneNumber: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            billingContact: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            isOptOnlinceAccess: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            deliveryCustomerName: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryAddress: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryCity: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryState: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryZipCode: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryPhoneNumber: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            email: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            manager: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            isPaperInvoiceRequired: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isEmailSignedInvoiceRequired: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            dayOpened: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            paymentTerms: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            knifeInventory: Joi.array().items(knifeItems).optional().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
            }),
            programs: Joi.array().items(programItems).optional().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
            }),
            instructions: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            authorisedBy: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            title: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            customerSignature: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            note: Joi.string().optional().allow('')
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            openWindow1: Joi.optional(),
            openWindow2: Joi.optional(),
            closeWindow1: Joi.optional(),
            closeWindow2: Joi.optional(),
            latitude: Joi.number().optional().allow(0,null)
                .messages({
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            longitude: Joi.number().optional().allow(0,null)
                .messages({
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
        });
    }

    /**
    * Method: modifyKnifeQuantify
    * Purpose: JOI request validation
    * @param {*} 
    * @returns
    */
    modifyKnifeQuantify = (res) => {
        const knifeItems = Joi.object().keys({
            nsItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            quantity: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            amount: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            boxId: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });

        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsOrderId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            batchId: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            items: Joi.array().items(knifeItems).required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
                })
        });
    }

    /**
     * Method: modifyProgram
     * Purpose: JOI request validation
     * @param {*} 
     * @returns
     */
    modifyProgram = (res) => {
        const knifeItems = Joi.object().keys({
            nsItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            quantity: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            amount: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nextDeliveryDate: Joi.optional(),
            frequency: Joi.optional()
        });

        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsOrderId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            batchId: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            items: Joi.array().items(knifeItems).required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
                })
        });
    }
}

module.exports.ReportRequest = new ReportRequest();
