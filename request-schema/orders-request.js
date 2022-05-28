const Joi = require("joi");

class OrdersRequest {
    /**
   * Method: getDeliveryDetails
   * Purpose: JOI request validation
   * @param {*} LangMsg
   * @returns
   */
    getOrderDetails = (res) => {
        return Joi.object().keys({
            nsOrderId: Joi.number().integer().required().min(1)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                }),
        });
    }

    savePayment = (res) => {
        const items = Joi.object().keys({
            nsOrderItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            quantity: Joi.number().integer().optional().allow(0)
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
        const cheques = Joi.object().keys({
            checkNumber: Joi.string().required().messages({
                "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
            }),
            price: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        }).optional().messages({
            "object.base": `${res.__("VALIDATION.MUST_BE_A_OBJECT")}`
        });
        return Joi.object().keys({
            batchId: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                }),
            nsOrderId: Joi.number().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
            }),
            orderItems: Joi.array().items(items),
            paymentMode: Joi.number().allow(0, 1, 2, 3).required().messages({
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
                nsDocumentNumber: Joi.string().optional().messages({
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                })
            })),
            cheques: Joi.array().items(cheques),
            textNote: Joi.string().optional().allow('').messages({
                "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
            }),
            deliveryStartTime: Joi.string().required().messages({
                "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
            }),
            completedAt: Joi.string().required().messages({
                "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
            }),
            completedAtOriginalTimezone: Joi.string().required().messages({
                "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
            }),
            latitude: Joi.number().optional()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            longitude: Joi.number().optional()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }

    completeRouteDetails = (res) => {
        return Joi.object().keys({
            batchId: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`,
                }),
        });
    }

    completeRoute = (res) => {
        return Joi.object().keys({
            batchId: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                }),
        });
    }

    changeOrderSequence = (res) => {
        return Joi.object().keys({
            nsOrderId1: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsOrderId2: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            sequence1: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            sequence2: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }

    inventoryQuantityUpdate = (res) => {
        return Joi.object().keys({
            nsOrderItemId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            quantity: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
        });
    }

    getEodReportAM = (res) => {
        return Joi.object().keys({
            eodDate: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
                })
        });
    }

    oneTimeSaleRequest = (res) => {
        const items = Joi.object().keys({
            nsItemId: Joi.number().min(1).required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                    'number.min': `${res.__('VALIDATION.LENGTH_MUST_BE_AT_LEAST_CHARACTERS_LONG')}`
                }),
            amount: Joi.number().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                }),
            quantity: Joi.number().integer().optional().allow(0)
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
        return Joi.object().keys({
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
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
            items: Joi.array().items(items).required().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
            }),
            isOrderDelivered: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            email: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            approverName: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            deliveryDate: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            signatureImage: Joi.string().optional().allow('')
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            contactId: Joi.number().optional().allow(0)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "number.base": `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`,
                })
        });
    }

    modifyCustomerProgram = (res) => {
        const items = Joi.object().keys({
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
            frequency: Joi.string().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'string.base': `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                })
        });
        return Joi.object().keys({
            programRequestId: Joi.number().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
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
            items: Joi.array().items(items).required().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
            }),
            email: Joi.string().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            approverName: Joi.string().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            nextDeliveryDate: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            isNewProgram: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }

    knifeInventory = (res) => {
        const items = Joi.object().keys({
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
            boxId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isRemoved: Joi.number().integer().required()
                .messages({
                    "any.required": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
        return Joi.object().keys({
            knifeInventoryRequestId: Joi.number().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
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
            items: Joi.array().items(items).required().messages({
                "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`
            }),
            email: Joi.string().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            approverName: Joi.string().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            recurringTotal: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            knifeServiceFrequency: Joi.string().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            sharpningCenterId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }


    modifyCustomerContract = (res) => {
        const knifeInventoryItems = Joi.object().keys({
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
        const programeItems = Joi.object().keys({
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
            knifeInventoryRequestId: Joi.number().optional().allow(0)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            programRequestId: Joi.number().optional().allow(0)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            nsCustomerId: Joi.number().required()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
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
            knifeInventoryItems: Joi.array().items(knifeInventoryItems).optional(),
            programeItems: Joi.array().items(programeItems).optional(),
            email: Joi.string().optional().allow('')
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            approverName: Joi.string().optional().allow('')
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            recurringTotal: Joi.number().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            knifeServiceFrequency: Joi.string().optional().allow('')
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    "string.base": `${res.__("VALIDATION.MUST_BE_A_STRING")}`
                }),
            sharpningCenterId: Joi.number().optional().allow(0)
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                }),
            isNewPrograme: Joi.number().optional()
                .messages({
                    "any.requied": `${res.__("VALIDATION.IS_REQUIRED")}`,
                    'number.base': `${res.__("VALIDATION.MUST_BE_A_NUMBER")}`
                })
        });
    }
}

module.exports.OrdersRequest = new OrdersRequest()