"use strict";
const { OrdersRequest } = require('../request-schema/orders-request')
const { OrdersModel } = require('../model/orders')
const { CommonHelper } = require("../util/common-helper");
const Constant = require("../config/constant");

class OrdersController {
    getOrderDetails = async (req, res) => {
        try {
            const input = req.query;
            const { error, value } = OrdersRequest.getOrderDetails(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), {});
            }
            const response = await OrdersModel.getOrderDetails(input, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', {});
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", {});
                }
            });
            if (!response) { return; }
            // console.log(response.recordsets[1][0])
            let result = {};
            result.pickListItems = response.recordsets[0];
            result.lineItems = response.recordsets[1];
            result.customerDetails = response.recordsets[2][0];
            result.orderDetails = response.recordsets[3][0];
            result.invoices = response.recordsets[4];
            result.boxes = response.recordsets[5];
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", result);
        } catch (e) {
            console.log("delivery details controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", {});
        }
    };

    savePayment = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.savePayment(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await OrdersModel.savePayment(input, req.user).catch((err) => {
                switch (err) {
                    case 'ORDER_ALREADY_COMPLETED':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ORDER_ALREADY_COMPLETED', []);
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.PAYMENT_COMPLETED", []);
        } catch (e) {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };

    completeRouteDetails = async (req, res) => {
        try {
            const input = req.query;
            const { error, value } = OrdersRequest.completeRouteDetails(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await OrdersModel.completeRouteDetails(input, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", []);
        } catch (e) {
            console.log("save payment controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };

    completeRoute = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.completeRoute(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await OrdersModel.completeRoute(input, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.PAYMENT_COMPLETED", []);
        } catch (e) {
            console.log("complete order controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };


    changeOrderSequence = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.changeOrderSequence(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await OrdersModel.changeOrderSequence(value).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.SEQUENCE_CHANGED", []);
        } catch (e) {
            console.log("complete order controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };

    inventoryQuantityUpdate = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.inventoryQuantityUpdate(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }
            const response = await OrdersModel.inventoryQuantityUpdate(value).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });
            if (!response) { return; }
            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.QUANTITY_PRODUCT_UPDATED", response[0]);
        } catch (e) {
            console.log("complete order controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };

    /**
   * Method: getEodReportAM
   * Purpose: get eod report am
   * @param {*} req
   * @param {*} res
   * @returns
   */
    getEodReportAM = async (req, res) => {
        try {
            const input = req.query;
            const { error, value } = OrdersRequest.getEodReportAM(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }

            const nsEmployeeId = req.user.nsEmployeeId
            const response = await OrdersModel.getEodReportAM(value, nsEmployeeId).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            // console.log(response)

            let resObj = {
                batchIds: {},
                paymentDetails: {},
                cases: {}
            }
            const resData = response[0]
            const resDataPayment = response[1]
            const cases = response[2]
            
            // console.log(resDataPayment)

            for (let i = 0; i < resData.length; i++) {
                if (resObj["batchIds"][resData[i].batchId]) {
                    resObj["batchIds"][resData[i].batchId].push(
                        {
                            "nsDocumentNumber": resData[i].nsDocumentNumber,
                            "deliverDate": resData[i].deliveryDate,
                            "totalAmount": resData[i].totalAmount,
                            "companyName": resData[i].companyName,
                            "completedAt": resData[i].completedAt,
                            "nsEmployeeId": resData[i].nsEmployeeId,
                            "isCompleted": resData[i].isCompleted
                        }
                    )
                } else {
                    resObj["batchIds"][resData[i].batchId] = [
                        {
                            "nsDocumentNumber": resData[i].nsDocumentNumber,
                            "deliverDate": resData[i].deliveryDate,
                            "totalAmount": resData[i].totalAmount,
                            "companyName": resData[i].companyName,
                            "completedAt": resData[i].completedAt,
                            "nsEmployeeId": resData[i].nsEmployeeId,
                            "isCompleted": resData[i].isCompleted
                        }
                    ]
                }
            }

            for(let i = 0; i < resDataPayment.length; i++) {
                if (resObj["paymentDetails"][resDataPayment[i].batchId]) {
                    resObj["paymentDetails"][resDataPayment[i].batchId].push(
                        {
                            "companyName": resDataPayment[i].companyName,
                            "paymentType": resDataPayment[i].paymentType,
                            "paymentDate": resDataPayment[i].paymentDate,
                            "amountPaid": resDataPayment[i].amountPaid,
                            "nsDocumentNumber": resDataPayment[i].nsDocumentNumber,
                            "companyName": resDataPayment[i].companyName
                        }
                    )
                } else {
                    resObj["paymentDetails"][resDataPayment[i].batchId] = [
                        {
                            "companyName": resDataPayment[i].companyName,
                            "paymentType": resDataPayment[i].paymentType,
                            "paymentDate": resDataPayment[i].paymentDate,
                            "amountPaid": resDataPayment[i].amountPaid,
                            "nsDocumentNumber": resDataPayment[i].nsDocumentNumber,
                            "companyName": resDataPayment[i].companyName
                        }
                    ]
                }
            }

            for(let i = 0; i < cases.length; i++) {
                if (resObj["cases"][cases[i].batchId]) {
                    resObj["cases"][cases[i].batchId].push(
                        {
                            "companyName": cases[i].companyName,
                            "batchId": cases[i].batchId,
                            "caseType": cases[i].caseType,
                            "caseSubject": cases[i].caseSubject,
                            "caseText": cases[i].caseText,
                            "caseStatus": cases[i].caseStatus
                        }
                    )
                } else {
                    resObj["cases"][cases[i].batchId] = [
                        {
                            "companyName": cases[i].companyName,
                            "batchId": cases[i].batchId,
                            "caseType": cases[i].caseType,
                            "caseSubject": cases[i].caseSubject,
                            "caseText": cases[i].caseText,
                            "caseStatus": cases[i].caseStatus
                        }
                    ]
                }
            }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
        } catch (e) {
            console.log("eod report am - controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    };

    /**
   * Method: getOrderDocuments
   * Purpose: get order documents
   * @param {*} req
   * @param {*} res
   * @returns
   */
    getOrderDocuments = async (req, res) => {
        try {
            const response = await OrdersModel.getOrderDocuments().catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
        } catch (e) {
            console.log("complete order controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }

    /**
   * Method: oneTimeSaleRequest
   * Purpose: one time sale request
   * @param {*} req
   * @param {*} res
   * @returns
   */
    oneTimeSaleRequest = async (req, res) => {
        try {
            const input = req.body;
            
            const { error, value } = OrdersRequest.oneTimeSaleRequest(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }

            const response = await OrdersModel.oneTimeSaleRequest(value, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
        } catch (e) {
            console.log("one time sales controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }

    /**
     * Method: modifyCustomerContract
     * Purpose: modifyCustomerContract
     * @param {*} req
     * @param {*} res
     * @returns
     */
    modifyCustomerProgram = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.modifyCustomerProgram(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }

            const response = await OrdersModel.modifyCustomerProgram(value, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
        } catch (e) {
            console.log("modify contract controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }



    /**
     * Method: knifeInventory
     * Purpose: knifeInventory
     * @param {*} req
     * @param {*} res
     * @returns
     */
    knifeInventory = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.knifeInventory(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }

            const response = await OrdersModel.knifeInventory(value, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
        } catch (e) {
            console.log("knife inventory controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }

    /**
     * Method: modifyContract
     * Purpose: modifyContract
     * @param {*} req
     * @param {*} res
     * @returns
     */
    modifyCustomerContract = async (req, res) => {
        try {
            const input = req.body;
            const { error, value } = OrdersRequest.modifyCustomerContract(res).validate(input);
            //Validation error sending, if error generated
            if (error && error.details[0]) {
                return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
            }

            const response = await OrdersModel.modifyCustomerContract(value, req.user).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
        } catch (e) {
            console.log("knife inventory controller catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }

    /**
     * Method: driverDetails
     * Purpose: driverDetails
     * @param {*} req
     * @param {*} res
     * @returns
     */
    driverDetails = async (req, res) => {
        try {
            const nsEmployeeId = req.user.nsEmployeeId
            const response = await OrdersModel.driverDetails(nsEmployeeId).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
        } catch (e) {
            console.log("driver details catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }

    /**
     * Method: routeToAM
     * Purpose: routeToAM
     * @param {*} req
     * @param {*} res
     * @returns
     */
    routeToAM = async (req, res) => {
        try {
            const nsEmployeeId = req.user.nsEmployeeId
            const response = await OrdersModel.routeToAM(nsEmployeeId).catch((err) => {
                switch (err) {
                    case 'INVALID_REQUEST':
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
                    default:
                        return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
                }
            });

            if (!response) { return; }

            return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
        } catch (e) {
            console.log("driver details catch error ==>>", e);
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
        }
    }
}

module.exports = new OrdersController();
