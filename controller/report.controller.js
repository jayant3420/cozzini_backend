"use strict";
const Constant = require("../config/constant");
const { ReportRequest } = require("../request-schema/report-request");
const { ReportModel } = require("../model/report");
const { CommonHelper } = require("../util/common-helper");

class ReportController {
  /**
   * Method: dashboardCountReport
   * Purpose: get count report for dashboard
   * @param {*} req
   * @param {*} res
   * @returns
   */
  dashboardCountReport = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.dashboardCountReport(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("Login catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: eodReportBatchId
   * Purpose: get eod report by batch-id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  eodReportBatchId = async (req, res) => {
    try {

      const input = req.query
      const { error, value } = await ReportRequest.eodReportBatchId(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await ReportModel.eodReportBatchId(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      let output = {
        orderData : {},
        paymentDetails : {},
        cases : {}
      }

      const resOrderData = response[0]
      const resDataPayment = response[1]
      const cases = response[2]

      for(let i = 0; i < resOrderData.length; i++) {
        if(output["orderData"][resOrderData[i].batchId]) {
          output["orderData"][resOrderData[i].batchId].push(
            {
              "nsDocumentNumber" : resOrderData[i].nsDocumentNumber,
              "completedAt" : resOrderData[i].completedAt,
              "totalAmount" : resOrderData[i].totalAmount,
              "companyName" : resOrderData[i].companyName,
              "nsEmployeeId": resOrderData[i].nsEmployeeId,
              "isCompleted": resOrderData[i].isCompleted
            }
          )
        } else {
          output["orderData"][resOrderData[i].batchId] = [
            {
              "nsDocumentNumber" : resOrderData[i].nsDocumentNumber,
              "completedAt" : resOrderData[i].completedAt,
              "totalAmount" : resOrderData[i].totalAmount,
              "companyName" : resOrderData[i].companyName,
              "nsEmployeeId": resOrderData[i].nsEmployeeId,
              "isCompleted": resOrderData[i].isCompleted
            }
          ]
        }
      }

      for(let i = 0; i < resDataPayment.length; i++) {
        if (output["paymentDetails"][resDataPayment[i].batchId]) {
          output["paymentDetails"][resDataPayment[i].batchId].push(
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
          output["paymentDetails"][resDataPayment[i].batchId] = [
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
        if (output["cases"][cases[i].batchId]) {
          output["cases"][cases[i].batchId].push(
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
          output["cases"][cases[i].batchId] = [
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

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", output);
    } catch (e) {
      console.log("EOD report by batch-id catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: eodReportRouteName
   * Purpose: get eod report by route-name
   * @param {*} req
   * @param {*} res
   * @returns
   */
  eodReportRouteName = async (req, res) => {
    try {

      const input = req.query
      const { error, value } = await ReportRequest.eodReportRouteName(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await ReportModel.eodReportRouteName(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObj = {
        batchId: {},
        paymentDetails: {},
        cases: {}
      }
      const batchId = response[0]
      const paymentDetail = response[1]
      const cases = response[2]
      // console.log(resData)

      for(let i = 0; i < batchId.length; i++) {
        if(resObj["batchId"][batchId[i].batchId]) {
          resObj["batchId"][batchId[i].batchId].push(
            {
              "nsDocumentNumber" : batchId[i].nsDocumentNumber,
              "completedAt" : batchId[i].completedAt,
              "totalAmount" : batchId[i].totalAmount,
              "companyName" : batchId[i].companyName,
              "batchId": batchId[i].batchId,
              "isCompleted": batchId[i].isCompleted,
              "nsEmployeeId": batchId[i].nsEmployeeId
            }
          )
        } else {
          resObj["batchId"][batchId[i].batchId] = [
            {
              "nsDocumentNumber" : batchId[i].nsDocumentNumber,
              "completedAt" : batchId[i].completedAt,
              "totalAmount" : batchId[i].totalAmount,
              "companyName" : batchId[i].companyName,
              "batchId": batchId[i].batchId,
              "isCompleted": batchId[i].isCompleted,
              "nsEmployeeId": batchId[i].nsEmployeeId
            }
          ]
        }
      }

      for(let i = 0; i < paymentDetail.length; i++) {
        if(resObj["paymentDetails"][paymentDetail[i].batchId]) {
          resObj["paymentDetails"][paymentDetail[i].batchId].push(
            {
              "nsDocumentNumber" : paymentDetail[i].nsDocumentNumber,
              "completedAt" : paymentDetail[i].completedAt,
              "totalAmount" : paymentDetail[i].totalAmount,
              "companyName" : paymentDetail[i].companyName,
              "batchId": paymentDetail[i].batchId,
              "isCompleted": paymentDetail[i].isCompleted,
              "nsEmployeeId": paymentDetail[i].nsEmployeeId,
              "nsOrderId": paymentDetail[i].nsOrderId,
            }
          )
        } else {
          resObj["paymentDetails"][batchId[i].batchId] = [
            {
              "nsDocumentNumber" : batchId[i].nsDocumentNumber,
              "completedAt" : batchId[i].completedAt,
              "totalAmount" : batchId[i].totalAmount,
              "companyName" : batchId[i].companyName,
              "batchId": batchId[i].batchId,
              "isCompleted": batchId[i].isCompleted,
              "nsEmployeeId": batchId[i].nsEmployeeId
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
      console.log("EOD report by route-name catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: paymentReport
   * Purpose: get payment report end-route 
   * @param {*} req
   * @param {*} res
   * @returns
   */
  paymentReport = async (req, res) => {
    try {

      const input = req.query
      const { error, value } = await ReportRequest.paymentReport(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await ReportModel.paymentReport(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }  

      const resObj = {}
      resObj["cashReport"] = response[0][0]
      const chequeReport = response[1][0]
      const chequeArray = chequeReport && JSON.parse(chequeReport.chequeNumber)
      const companyName = chequeReport && chequeReport.companyName
      const chequeResponseArray = []
      chequeArray && chequeArray.map((item) => {
        const newObj = {}
        newObj["chequeNum"] = item.checkNumber,
        newObj["companyName"] = companyName,
        newObj["chequeAmount"] = parseFloat(item.price)
        chequeResponseArray.push(newObj)
      })

      resObj["chequeReport"] = chequeResponseArray

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("payment report controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: deliveryWindowCS
   * Purpose: to get the details of delivery window customer service 
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deliveryWindowCS = async (req, res) => {
    try {

      const input = req.query
      const { error, value } = await ReportRequest.deliveryWindowCS(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await ReportModel.deliveryWindowCS(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; } 

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("delivery window -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: deliveryWindowAM
   * Purpose: to get the details of delivery window area manager
   * @param {*} req
   * @param {*} res
   * @returns
   */
   deliveryWindowAM = async (req, res) => {
    try {

      const input = req.query
      const { error, value } = await ReportRequest.deliveryWindowAM(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.deliveryWindowAM(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; } 

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("delivery window -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: openRestaurrantsForm
   * Purpose: save new restaurrants data
   * @param {*} req
   * @param {*} res
   * @returns
   */
  openRestaurrantsForm = async (req, res) => {
    try {

      const input = req.body
      const { error, value } = await ReportRequest.openRestaurrantsForm(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.openRestaurrantsForm(value, nsEmployeeId).catch((err) => {
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
      console.log("open restaurrants -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: modifyKnifeQuantify
   * Purpose: modify knife quantity
   * @param {*} req
   * @param {*} res
   * @returns
   */
  modifyKnifeQuantify = async (req, res) => {
    try {

      const input = req.body
      const { error, value } = await ReportRequest.modifyKnifeQuantify(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.modifyKnifeQuantify(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'DATA_SYNCED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.DATA_SYNCED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; } 

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("modify knife items update -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: modifyProgram
   * Purpose: modifyProgram
   * @param {*} req
   * @param {*} res
   * @returns
   */
  modifyProgram = async (req, res) => {
    try {

      const input = req.body
      const { error, value } = await ReportRequest.modifyProgram(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.modifyProgram(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'DATA_SYNCED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.DATA_SYNCED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; } 

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("modify program -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: dashboardCountReportCS
   * Purpose: dashboardCountReportCS
   * @param {*} req
   * @param {*} res
   * @returns
   */
  dashboardCountReportCS = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await ReportModel.dashboardCountReportCS(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("dashboard count - catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

}

module.exports = new ReportController();
