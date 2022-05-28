"use strict";
const Constant = require("../config/constant");
const { RouteRequest } = require("../request-schema/route-request");
const { RouteModel } = require("../model/route");
const { CommonHelper } = require("../util/common-helper");

class RouteController {
  /**
   * Method: getRoutes
   * Purpose: To get employee's current week routes
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRoutes = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId;
      const response = await RouteModel.getRoutes(nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", [],);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response.data.recordset);
    } catch (e) {
      console.log("Routes catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getRouteStops
   * Purpose: To get all stops for a specific route
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getRouteStops = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getRouteStops(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getRouteStops(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      let data = response.data.recordset
      data.map((item, index) => {
        if(index % 2 === 0) {
          item.paymentType = 'card payment'
        }
        return item
      })

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", data, response.data.rowsAffected[0]);
    } catch (e) {
      console.log("Routes stops catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: getCompletedStops
   * Purpose: To get all the completed stops for current day
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getCompletedStops = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getCompletedRouteStops(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const employeeId = req.user.nsEmployeeId;
      const response = await RouteModel.getCompletedStops(value,employeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_FETCHED", response.data.recordset);
    } catch (e) {
      console.log("Get completed stops error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getSkippedStops
   * Purpose: To get all the skipped stops for the current day
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getSkippedStops = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getSkippedRouteStops(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const employeeId = req.user.nsEmployeeId;
      const response = await RouteModel.getSkippedStops(value,employeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER": {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          } default: {
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
          }
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_FETCHED", response.data.recordset);
    } catch (e) {
      console.log("Get skipped stops error ===>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getIncompletedStops
   * Purpose: To get all the incompleted stops for the current day
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getIncompletedStops = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getIncompletedStops(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getIncompletedStops(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response.data.recordset, response.data.rowsAffected[0]);
    } catch (e) {
      console.log("Routes stops catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: unskipped-stops
   * Purpose: To get all the incompleted stops for the current day
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  unskippedStops = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.unskippedStops(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId;
      const response = await RouteModel.unskippedStops(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.STOPS_UNSKIPPED_SUCCESSFULLY");
    } catch (e) {
      console.log("Unskipped stops catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getUnskippedStopsList
   * Purpose: To get all the  unskipped stops list for area-manager
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  getUnskippedStopsList = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await RouteModel.getUnskippedStopsList(nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_FETCHED", response.data.recordset, response.data.recordset.length);
    } catch (e) {
      console.log("Unskipped stops list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getDrivers
   * Purpose: To get all the  driver list for area-manager
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
   getDrivers = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId;
      const response = await RouteModel.getDrivers(nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_FETCHED", response.data.recordset, response.data.recordset.length);
    } catch (e) {
      console.log("Get driver list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }


  /**
   * Method: reassignSkippedStop
   * Purpose: To re-assign a skipped stop to new driver or same driver
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  reassignSkippedStop = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.reassignSkippedStop(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.reassignSkippedStop(value).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("Reassign skipped stop catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getStates
   * Purpose: get state list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getStates = async (req, res) => {
    try {
      const response = await RouteModel.getStates().catch((err) => {
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
      console.log("States catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  requestBatchRoute = async (req, res) => {
    try {
      const response = await RouteModel.requestBatchRoute(req.user).catch((err) => {
        console.log("Request batch route db",err)
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "Request submitted successfully", []);
    } catch (e) {
      console.log("Reassign skipped stop catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  

  skipStop = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.skipStop(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.skipStop(input,req.user.nsEmployeeId).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("Reassign skipped stop catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  skipStopReason = async (req, res) => {
    try {
      const response = await RouteModel.skipStopReason().catch((err) => {
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
      console.log("States catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  modifyDeliveryWindow = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.modifyDeliveryWindow(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.modifyDeliveryWindow(input).catch((err) => {
        switch (err) {
          case "INVALID_USER":
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, "DATABASE.INVALID_USER", []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("modify delivery window request catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getRouteByState
   * Purpose: To get route by state
   * @param {*} req
   * @param {*} res
   * @returns
   */
   getRouteByState = async (req, res) => {
    try {
      const input = req.query;

      // console.log(input)

      const { error, value } = await RouteRequest.getRouteByState(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getRouteByState(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      // console.log(response)

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH",  response.map(obj => { if (obj.batchIds) { obj.batchIds = JSON.parse(obj.batchIds) } else { obj.batchIds = [] } return obj; }));
    } catch (e) {
      console.log("get route by state catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: getOrderbyBatchId
   * Purpose: To get orders by batch-id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getOrderbyBatchId = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getOrderbyBatchId(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getOrderbyBatchId(value).catch((err) => {
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
      console.log("state list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: documentMoveToBatchId
   * Purpose: updating the order's batch-id
   * @param {*} req
   * @param {*} res
   * @returns
   */
 documentMoveToBatchId = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.documentMoveToBatchId(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.documentMoveToBatchId(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ORDER_ALREADY_COMPLETED':
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ORDER_ALREADY_COMPLETED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DOCUMENT_MOVE_SUCCESSFULLY", []);
    } catch (e) {
      console.log("moving documentcatch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: getBatchIds
   * Purpose: To get all the batch-ids
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getBatchIds = async (req, res) => {
    try {
      const response = await RouteModel.getBatchIds().catch((err) => {
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
      console.log("state list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: deleteOrder
   * Purpose: To soft delete an order
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deleteOrder = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await RouteRequest.deleteOrder(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.deleteOrder(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.ORDER_DELETED_SUCCESSFULLY", []);
    } catch (e) {
      console.log("state list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: getRouteByStateCode
   * Purpose: To get all the routes by stateCode
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRouteByStateCode = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await RouteRequest.getRouteByStateCode(res).validate(input);

      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getRouteByStateCode(value).catch((err) => {
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
      console.log("route list catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

/**
   * Method: getAllRoutes
   * Purpose: To get all the route name
   * @param {*} req
   * @param {*} res
   * @returns
   */
   getRouteNames = async (req, res) => {
    try {
      const response = await RouteModel.getRouteNames().catch((err) => {
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
      console.log("get all route name error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: rerouteOrder
   * Purpose: To update the routes of orders
   * @param {*} req
   * @param {*} res
   * @returns
   */
  rerouteOrder = async (req, res) => {
    try {
      const input = req.body
      const nsEmployeeId = req.user.nsEmployeeId
      const { error, value } = await RouteRequest.rerouteOrder(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.rerouteOrder(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'CAN_NOT_MOVE':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.CAN_NOT_MOVE', []);
          case 'BATCH_ALREADY_STARTED_YOU_CAN_NOT_MOVE':
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.BATCH_ALREADY_STARTED_YOU_CAN_NOT_MOVE', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.BATCH_MOVE_SUCCESSFULLY", []);

    } catch (e) {
      console.log("get all route name error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: routesStopStatus
   * Purpose: To get the status of routes
   * @param {*} req
   * @param {*} res
   * @returns
   */
   routesStopStatus = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = await RouteRequest.routesStopStatus(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.routesStopStatus(value).catch((err) => {
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
      console.log("get route status error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  changeSequence = async (req, res) => {
    try {
      
      const input = req.body
      const { error, value } = RouteRequest.changeSequence(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.changeSequence(value,req.user).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.REQUEST_SENT_TO_AM", []);
    } catch (e) {
      console.log("change sequence status error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  stopDetails = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = RouteRequest.stopDetails(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.stopDetails(value).catch((err) => {
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
      console.log("stop details status error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }


  /**
   * Method: getRouteDetailsAM
   * Purpose: To get the details of a route in AM Dashboard
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRouteDetailsAM = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = RouteRequest.getRouteDetailsAM(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.getRouteDetailsAM(value).catch((err) => {
        console.log(err)
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ROUTE_NAME_NOT_EXIST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_NAME_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("stop details status error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }


  /**
   * Method: getRouteDayView
   * Purpose: To get the details of a route sequence in which the order is delivered
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRouteDayView = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = RouteRequest.getRouteDayView(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await RouteModel.getRouteDayView(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      function sortByDeliveredAt(a, b) {
        if(a.orderCompletedAt < b.orderCompletedAt) {
          return -1
        }
        if(a.orderCompletedAt > b.orderCompletedAt) {
          return 1
        }
        return 0
      }

      function sortByPlannedSequence(a, b) {
        if(a.plannedSequence < b.plannedSequence) {
          return -1
        }
        if(a.plannedSequence > b.plannedSequence) {
          return 1
        }
        return 0
      }

      let tempNewArray = response[2]
      let count = 0
      tempNewArray.map((item) => {
        if(item.orderCompletedAt) {
          item["actualSequence"] = ++count
        }
      })
      tempNewArray.sort(sortByDeliveredAt)

      count = 0
      tempNewArray.map((item) => {
        if(item.orderCompletedAt) {
          item["actualSequence"] = ++count
        }
      })
      tempNewArray.sort(sortByPlannedSequence)

      const responseObject = {}
      responseObject["routeDetails"] = response[0][0]
      responseObject["customerCoordinates"] = response[1]
      responseObject["orderSequenceDetails"] = tempNewArray

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", responseObject);
    } catch (e) {
      console.log("stop details status error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getRouteNameAM
   * Purpose: To get the driver routes of area manager
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getRouteNameAM = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await RouteModel.getRouteNameAM(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'AREA_MANAGER_NOT_EXIST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.AREA_MANAGER_NOT_EXIST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("area manager route name catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getModifyRouteDay
   * Purpose: To get details of modify route day screen
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getModifyRouteDay = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = RouteRequest.getModifyRouteDay(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.getModifyRouteDay(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      function sortByDeliveredAt(a, b) {
        if(a.deliveredAt < b.deliveredAt) {
          return -1
        }
        if(a.deliveredAt > b.deliveredAt) {
          return 1
        }
        return 0
      }

      function sortByRouteSequence(a, b) {
        if(a.routeSequence < b.routeSequence) {
          return -1
        }
        if(a.routeSequence > b.routeSequence) {
          return 1
        }
        return 0
      }

      let tempNewArray = response[2]
      let count = 0
      tempNewArray.map((item) => {
        if(item.deliveredAt) {
          item["actualSequence"] = ++count
        }
      })
      tempNewArray.sort(sortByDeliveredAt)

      count = 0
      tempNewArray.map((item) => {
        if(item.deliveredAt) {
          item["actualSequence"] = ++count
        }
      })
      tempNewArray.sort(sortByRouteSequence)

      const responseObject = {}
      responseObject["driverDetails"] = response[0]
      responseObject["coordinatesDetails"] = response[1]
      responseObject["orderDetails"] = tempNewArray

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", responseObject);
    } catch (e) {
      console.log("area manager route name catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: modifyLocationAM
   * Purpose: To modify latitude and logitude of a customer
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  modifyLocationAM = async (req, res) => {
    try {
      const input = req.body
      const { error, value } = RouteRequest.modifyLocationAM(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.modifyLocationAM(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'CUSTOMER_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.CUSTOMER_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.MODIFIED_LOCATION", []);
    } catch (e) {
      console.log("location modify controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 

  /**
   * Method: endRoute
   * Purpose: To update the data when route ends
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  endRoute = async (req, res) => {
    try {
      const input = req.body
      const nsEmployeeId = req.user.nsEmployeeId
      const { error, value } = RouteRequest.endRoute(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.endRoute(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ROUTE_NOT_STARTED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_NOT_STARTED', []);
          case 'ROUTE_END_INCOMPLETE_ORDER_EXIST':
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_END_INCOMPLETE_ORDER_EXIST', []);
          case 'ROUTE_ALREADY_END':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_ALREADY_END', []);
          case 'DAY_ENDED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.DAY_ENDED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.ROUTE_END_SUCCESS", []);
    } catch (e) {
      console.log("route end controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 

  /**
   * Method: batchListByBatchId
   * Purpose: to get batch list by batch id
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  batchListByBatchId = async (req, res) => {
    try {
      const input = req.query
      const { error, value } = RouteRequest.batchListByBatchId(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.batchListByBatchId(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'BATCH_EMPTY':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.BATCH_EMPTY', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("batch list by batch id controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 

  /**
   * Method: auditTrailList
   * Purpose: auditTrailList
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  auditTrailList = async (req, res) => {
    try {

      const response = await RouteModel.auditTrailList().catch((err) => {
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
      console.log("audit trail list - controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 

  /**
   * Method: updateAuditTrail
   * Purpose: updateAuditTrail
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateAuditTrail = async (req, res) => {
    try {

      const input = req.body
      const { error, value } = RouteRequest.updateAuditTrail(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await RouteModel.updateAuditTrail(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ROUTE_ALREADY_STARTED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_ALREADY_STARTED', []);
          case 'ROUTE_ALREADY_ENDED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ROUTE_ALREADY_ENDED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.UNDO_SUCCESSFULL", []);
    } catch (e) {
      console.log("update audit trail - controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 

  /**
   * Method: getBatchUnderCS
   * Purpose: getBatchUnderCS
   * Author: jayant
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getBatchUnderCS = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await RouteModel.getBatchUnderCS(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'EMPLOYEE_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.EMPLOYEE_NOT_EXISTS', []); 
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("getting batch under cs - controller catch error ==>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  } 
  
}

module.exports = new RouteController();
  