"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class OrdersModel {
    /**
   * Method: getDeliveryDetails
   * Purpose: Get delivery details from db
   * @param {*} params
   * @returns
   */
    getOrderDetails = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("_nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("_empId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, driverTokenData.nsEmployeeId));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getDeliveryDetails]`, newParams).catch((err) => {
                    reject(err)
                })
                resolve(dbRes);
            } catch (e) {
                console.log("customers catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    savePayment = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const invoices = { "invoices": input.invoices };
                const lineItems = { "orderItems": input.orderItems };
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 25, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("paymentMode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.paymentMode));
                newParams.push(SqlQueryBuilder.SqlParameter("collectedAmount", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.SmallMoney, null, input.collectedAmount));
                newParams.push(SqlQueryBuilder.SqlParameter("outstandAmount", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.SmallMoney, null, input.outstandingAmount));
                newParams.push(SqlQueryBuilder.SqlParameter("noPayment", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.noPayementCollected));
                newParams.push(SqlQueryBuilder.SqlParameter("checkNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.cheques)));
                newParams.push(SqlQueryBuilder.SqlParameter("invoices", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(invoices)));
                newParams.push(SqlQueryBuilder.SqlParameter("orderItems", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(lineItems)))
                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, driverTokenData.nsEmployeeId));
                newParams.push(SqlQueryBuilder.SqlParameter("textNote", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.textNote));
                newParams.push(SqlQueryBuilder.SqlParameter("deliveryStartTime", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.deliveryStartTime));
                newParams.push(SqlQueryBuilder.SqlParameter("completedAt", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.completedAt));
                newParams.push(SqlQueryBuilder.SqlParameter("completedAtOriginalTimezone", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.completedAtOriginalTimezone));
                newParams.push(SqlQueryBuilder.SqlParameter("signatureImage", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.signatureImage));
                newParams.push(SqlQueryBuilder.SqlParameter("contactId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.contactId));
                newParams.push(SqlQueryBuilder.SqlParameter("latitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.latitude));
                newParams.push(SqlQueryBuilder.SqlParameter("longitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.longitude));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_completeDelivery]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                if (dbRes && dbRes.recordset && Array.isArray(dbRes.recordset) && dbRes.recordset[0].error && dbRes.recordset[0].error == 'ORDER_ALREADY_COMPLETED') {
                    reject('ORDER_ALREADY_COMPLETED');
                } else {
                    resolve(dbRes);
                }
            } catch (e) {
                console.log("save payment model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    completeRouteDetails = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("_batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("_empId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, driverTokenData.nsEmployeeId));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_completeRouteDetails]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                resolve(dbRes);
            } catch (e) {
                console.log("complete route model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    completeRoute = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("_batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("_empId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, driverTokenData.nsEmployeeId));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_completeRoute]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                resolve(dbRes);
            } catch (e) {
                console.log("complete route model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    changeOrderSequence = async (input) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId1));
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId2", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId2));
                newParams.push(SqlQueryBuilder.SqlParameter("sequence1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.sequence1));
                newParams.push(SqlQueryBuilder.SqlParameter("sequence2", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.sequence2));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[modifyOrderSequence]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                resolve(true);
            } catch (e) {
                console.log("change sequence order catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    inventoryQuantityUpdate = async (input) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderItemId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderItemId));
                newParams.push(SqlQueryBuilder.SqlParameter("quantity", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.quantity));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_inventoryQuantityUpdate]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                // resolve(true);
                if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
                    resolve(dbRes.recordset);
                } else {
                    reject("INVALID_REQUEST");
                }
            } catch (e) {
                console.log("change sequence order catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    getEodReportAM = async (input, nsEmployeeId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("eodDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.eodDate));
                newParams.push(SqlQueryBuilder.SqlParameter("amEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getEODReportAM]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                // resolve(true);

                console.log(dbRes.recordsets)

                if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
                    resolve(dbRes.recordsets);
                } else {
                    reject("INVALID_REQUEST");
                }
            } catch (e) {
                console.log("eod report am catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: getOrderDocuments
     * Purpose: get all orders documents from db
     * @param {*} params
     * @returns
     */
    getOrderDocuments = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];
                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getOrderDocument]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                // resolve(true);

                if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
                    resolve(dbRes.recordset);
                } else {
                    reject("INVALID_REQUEST");
                }
            } catch (e) {
                console.log("getting order's documents catch error ===>>> ", e);
                reject(e);
            }
        });
    };


    /**
     * Method: oneTimeSaleRequest
     * Purpose: oneTimeSaleRequest
     * @param {*} params
     * @returns
     */
    oneTimeSaleRequest = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const items = { "items": input.items };
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("items", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(items)))
                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, driverTokenData.nsEmployeeId));
                newParams.push(SqlQueryBuilder.SqlParameter("isOrderDelivered", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isDelivered));
                newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.email));
                newParams.push(SqlQueryBuilder.SqlParameter("approverName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.approverName));
                newParams.push(SqlQueryBuilder.SqlParameter("deliveryDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Date, null, input.deliveryDate));
                newParams.push(SqlQueryBuilder.SqlParameter("contactId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.contactId));
                newParams.push(SqlQueryBuilder.SqlParameter("signatureImage", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, sql.MAX, input.signatureImage));

                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_oneTimeSaleRequest]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })

                if (dbRes && dbRes.recordset && Array.isArray(dbRes.recordset) && dbRes.recordset[0].error && dbRes.recordset[0].error == 1) {
                    reject('INVALID_REQUEST');
                } else {
                    resolve(dbRes);
                }
            } catch (e) {
                console.log("one time sales model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: modifyCustomerContract
     * Purpose: modifyCustomerContract
     * @param {*} params
     * @returns
     */
    modifyCustomerProgram = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const items = { "programeItems": input.items };
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("programRequestId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.programRequestId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("programeItems", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(items)))
                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, driverTokenData.nsEmployeeId));
                newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.email));
                newParams.push(SqlQueryBuilder.SqlParameter("approverName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.approverName));
                newParams.push(SqlQueryBuilder.SqlParameter("nextDeliveryDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.nextDeliveryDate));
                newParams.push(SqlQueryBuilder.SqlParameter("isNewProgram", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isNewProgram));

                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_modifyCustomerProgram]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                if (dbRes && dbRes.recordset && Array.isArray(dbRes.recordset) && dbRes.recordset[0].isError && dbRes.recordset[0].isError == 1) {
                    reject('INVALID_REQUEST');
                } else {
                    resolve(dbRes);
                }
            } catch (e) {
                console.log("modify contract model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: knifeInventory
     * Purpose: knifeInventory
     * @param {*} params
     * @returns
     */
    knifeInventory = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                const items = { "knifeInventoryItems": input.items };
                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("knifeInventoryRequestId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.knifeInventoryRequestId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("knifeInventoryItems", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(items)))
                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, driverTokenData.nsEmployeeId));
                newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.email));
                newParams.push(SqlQueryBuilder.SqlParameter("approverName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.approverName));
                newParams.push(SqlQueryBuilder.SqlParameter("recurringTotal", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.recurringTotal));
                newParams.push(SqlQueryBuilder.SqlParameter("knifeServiceFrequency", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.knifeServiceFrequency));
                newParams.push(SqlQueryBuilder.SqlParameter("sharpningCenterId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.sharpningCenterId));


                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_knifeInventory]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                if (dbRes && dbRes.recordset && Array.isArray(dbRes.recordset) && dbRes.recordset[0].isError && dbRes.recordset[0].isError == 1) {
                    reject('INVALID_REQUEST');
                } else {
                    resolve(dbRes);
                }
            } catch (e) {
                console.log("knife inventory model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: knifeInventory
     * Purpose: knifeInventory
     * @param {*} params
     * @returns
     */
    modifyCustomerContract = async (input, driverTokenData) => {
        return new Promise(async (resolve, reject) => {
            try {
                let isKnifeInventory = false;
                let isPrograme = false;
                isKnifeInventory = (Array.isArray(input.knifeInventoryItems) && input.knifeInventoryItems.length > 0) ? 1 : 0;
                isPrograme = (Array.isArray(input.programeItems) && input.programeItems.length > 0) ? 1 : 0;
                const knifeInventoryItems = { "knifeInventoryItems": (Array.isArray(input.knifeInventoryItems) && input.knifeInventoryItems.length > 0) ? input.knifeInventoryItems : [] };
                const programeItems = { "programeItems": (Array.isArray(input.programeItems) && input.programeItems.length > 0) ? input.programeItems : [] };

                const newParams = [];
                newParams.push(SqlQueryBuilder.SqlParameter("knifeInventoryRequestId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.knifeInventoryRequestId));
                newParams.push(SqlQueryBuilder.SqlParameter("programRequestId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.programRequestId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
                newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
                newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
                newParams.push(SqlQueryBuilder.SqlParameter("knifeInventoryItems", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(knifeInventoryItems)))
                newParams.push(SqlQueryBuilder.SqlParameter("programeItems", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(programeItems)))
                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, driverTokenData.nsEmployeeId));
                newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.email));
                newParams.push(SqlQueryBuilder.SqlParameter("approverName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.approverName));
                newParams.push(SqlQueryBuilder.SqlParameter("recurringTotal", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.recurringTotal));
                newParams.push(SqlQueryBuilder.SqlParameter("knifeServiceFrequency", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, input.knifeServiceFrequency));
                newParams.push(SqlQueryBuilder.SqlParameter("boxId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.boxId));
                newParams.push(SqlQueryBuilder.SqlParameter("sharpningCenterId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.sharpningCenterId));
                newParams.push(SqlQueryBuilder.SqlParameter("nextDeliveryDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.nextDeliveryDate));
                newParams.push(SqlQueryBuilder.SqlParameter("isNewPrograme", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isNewPrograme));
                newParams.push(SqlQueryBuilder.SqlParameter("isKnifeInventory", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, isKnifeInventory));
                newParams.push(SqlQueryBuilder.SqlParameter("isPrograme", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, isPrograme));

                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_modifyCustomerContract]`, newParams).catch((err) => {
                    console.log("sp error", err);
                    reject(err)
                })
                if (dbRes && dbRes.recordset && Array.isArray(dbRes.recordset) && dbRes.recordset[0].isError && dbRes.recordset[0].isError == 1) {
                    reject('INVALID_REQUEST');
                } else {
                    resolve(dbRes);
                }
            } catch (e) {
                console.log("knife inventory model catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: driverDetails
     * Purpose: driverDetails
     * @param {*} params
     * @returns
     */
    driverDetails = async (nsEmployeeId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];

                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getDriverDetailsAM]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                // resolve(true);

                if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
                    resolve(dbRes.recordset);
                } else {
                    reject("INVALID_REQUEST");
                }
            } catch (e) {
                console.log("getting driver details catch error ===>>> ", e);
                reject(e);
            }
        });
    };

    /**
     * Method: routeToAM
     * Purpose: routeToAM
     * @param {*} params
     * @returns
     */
    routeToAM = async (nsEmployeeId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newParams = [];

                newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

                const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getRouteToAM]`, newParams)
                    .catch((err) => {
                        reject(err)
                    })
                // resolve(true);

                if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
                    resolve(dbRes.recordset);
                } else {
                    reject("INVALID_REQUEST");
                }
            } catch (e) {
                console.log("route to am - catch error ===>>> ", e);
                reject(e);
            }
        });
    };
}

module.exports.OrdersModel = new OrdersModel()