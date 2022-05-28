"use strict";
const Constant = require("../config/constant");
const { EmployeeRequest } = require("../request-schema/employee-request");
const { EmployeeModel } = require("../model/employee");
const { CommonHelper } = require("../util/common-helper");

class EmployeeController {
  saveDriverHealthLog = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = EmployeeRequest.saveDriverHealthLog(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await EmployeeModel.saveDriverHealthLog(value, req.user).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.DRIVER_HEALTH_LOG_ADDED", []);
    } catch (e) {
      console.log("driver health log catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }
}

module.exports = new EmployeeController();