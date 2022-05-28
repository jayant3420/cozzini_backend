"use strict";
const Constant = require("../config/constant");
const { VehicleRequest } = require("../request-schema/vehicle-request");
const { VehicleModel } = require("../model/vehicle");
const { CommonHelper } = require("../util/common-helper");

class VehiclesController {
  /**
   * Method: getEmployeeVehicles
   * Purpose: To get all employee vehicle information
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getEmployeeVehicles = async (req, res) => {
    try {
      const employeeId = req.user.nsEmployeeId;
      const response = await VehicleModel.getEmployeeVehicles(employeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response.map((item) => {
        if(item.VehicleInspectionQuestions) { item.VehicleInspectionQuestions = JSON.parse(item.VehicleInspectionQuestions)} else {item.VehicleInspectionQuestions = []} return item
      }), response.length);
    } catch (e) {
      console.log("Get vechicle details error ==>>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: vehicleInspection
   * Purpose: Submiting vehicle inspection answers
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  vehicleInspection = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await VehicleRequest.vehicleInspection(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), [],);
      }

      const response = await VehicleModel.vehicleInspection(value).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } 
          case "INSPECTION_ALREADY_DONE_TODAY": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INSPECTION_ALREADY_DONE_TODAY", []);
          }
          default: {
            return CommonHelper.sendError(res, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("Vehicle inspection submit error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: logStartEndTime
   * Purpose: Submitting the time logs for start day, end day, start route and end route
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  logStartEndTime = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await VehicleRequest.logStartEndTime(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId;
      const response = await VehicleModel.logStartEndTime(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } case "DAY_ALREADY_STARTED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.START_DAY_ERROR", []);
          } case "DAY_NOT_STARTED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.DAY_NOT_STARTED_ERROR", []);
          } case "DAY_ALREADY_END": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.END_DAY_ERROR", []);
          } case "END_DAY_INCOMPLETE_ORDER_EXIST": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.END_DAY_INCOMPLETE_ORDER_ERROR", []);
          } case "ROUTE_ALREADY_STARTED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_START_ERROR", []);
          } case "ROUTE_DAY_NOT_STARTED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_DAY_START_ERROR", []);
          } case "ROUTE_NOT_STARTED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_END_START_ERROR", []);
          } case "ROUTE_ALREADY_END": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_END_ERROR", []);
          } case "ROUTE_END_INCOMPLETE_ORDER_EXIST": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_END_INCOMPLETE_ORDER_ERROR", []);
          } case "ROUTE_DAY_ENDED_ERROR": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_DAY_ENDED_ERROR", []);
          } case "DAY_ENDED": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.ROUTE_END_DAY_ERROR", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, response.status, Constant.STATUS_CODE.HTTP_200_OK, response.message, []);
    } catch (e) {
      console.log("Start-and-End time Error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: addVehicle
   * Purpose: To add a new vehicle
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  addVehicle = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await VehicleRequest.addVehicle(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await VehicleModel.addVehicle(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } case "VEHICLE_NAME_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VEHICLE_NAME_EXISTS", []);
          } case "VIN_NUMBER_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VIN_NUMBER_EXISTS", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, response.status, Constant.STATUS_CODE.HTTP_200_OK, response.message, []);

    } catch (e) {
      console.log("Add Vehicle Error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: deleteVehicle
   * Purpose: To delete a vehicle
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
   deleteVehicle = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await VehicleRequest.deleteVehicle(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await VehicleModel.deleteVehicle(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } case "VEHICLE_NOT_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VEHICLE_NOT_EXISTS", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, response.status, Constant.STATUS_CODE.HTTP_200_OK, response.message, []);

    } catch (e) {
      console.log("Delete Vehicle Error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getEmployeeVehiclesAM
   * Purpose: To get the vehicle list whose employees comes under area manager
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getEmployeeVehiclesAM = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await VehicleModel.getEmployeeVehiclesAM(nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } case "VEHICLE_NOT_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VEHICLE_NOT_EXISTS", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, response.status, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);

    } catch (e) {
      console.log("get vehicles catch error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: saveVehicleAM
   * Purpose: saveVehicleAM
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  saveVehicleAM = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const input = req.body
      const { error, value } = await VehicleRequest.saveVehicleAM(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await VehicleModel.saveVehicleAM(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_REQUEST": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_REQUEST", []);
          }
          case "VEHICLE_NAME_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VEHICLE_NAME_EXISTS", []);
          }
          case "VIN_NUMBER_EXISTS": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.VIN_NUMBER_EXISTS", []);
          }
          default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);

    } catch (e) {
      console.log("add vehicle am - catch error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: vehicleNickname
   * Purpose: vehicleNickname
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  vehicleNickname = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const input = req.body
      const { error, value } = await VehicleRequest.vehicleNickname(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await VehicleModel.vehicleNickname(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_REQUEST": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_REQUEST", []);
          } 
          default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.VEHICLE_NAME_UPDATED_SUCCESSFULLY", []);

    } catch (e) {
      console.log("add vehicle nickname - catch error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }
}

module.exports = new VehiclesController();
