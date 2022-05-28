"use strict";
const Constant = require("../config/constant");
const { NotificationModel } = require("../model/notification");
const { NotificationRequest } = require("../request-schema/notification-request")
const { CommonHelper } = require("../util/common-helper");

class NotificationController {
  /**
 * Method: getNotificationList
 * Purpose: gettin notification list
 * @param {*} req
 * @param {*} res
 * @returns
 */
  getNotificationList = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await NotificationRequest.getNotificationList(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await NotificationModel.getNotificationList(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObj = {}
      resObj["deliveryLocationChange"] = response[0]
      resObj["routeSequenceChange"] = response[1]
      resObj["multipleBatchRequest"] = response[2]

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("notification list controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
* Method: getNotificationFilterData
* Purpose: getNotificationFilterData
* @param {*} req
* @param {*} res
* @returns
*/
  getNotificationFilterData = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const input = req.query;
      const { error, value } = await NotificationRequest.getNotificationFilterData(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await NotificationModel.getNotificationFilterData(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObj = {}
      resObj["states"] = response[0] ? response[0] : []
      resObj["drivers"] = response[1] ? response[1] : []
      resObj["customers"] = response[2] ? response[2] : []

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("notifiction fitler data - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getNotificationFilterValueBasedData
   * Purpose: getNotificationFilterValueBasedData
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNotificationFilterValueBasedData = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await NotificationRequest.getNotificationFilterValueBasedData(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await NotificationModel.getNotificationFilterValueBasedData(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObj = {}
      resObj["routeNameList"] = response[0] ? response[0] : []
      resObj["batchIdList"] = response[1] ? response[1] : []
      resObj["customerList"] = response[2] ? response[2] : []

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("notifiction filter value based - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getNotificationOrders
   * Purpose: getNotificationOrders
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNotificationOrders = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await NotificationRequest.getNotificationOrders(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await NotificationModel.getNotificationOrders(value, nsEmployeeId).catch((err) => {
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
      console.log("notification orders list - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: saveNotifications
   * Purpose: saveNotifications
   * @param {*} req
   * @param {*} res
   * @returns
   */
  saveNotifications = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await NotificationRequest.saveNotifications(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await NotificationModel.saveNotifications(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ONLY_ONE_FIELD_ALLOWED_TO_FILLED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ONLY_ONE_FIELD_ALLOWED_TO_FILLED', []);
          case 'ORDERLIST_CAN_NOT_EMPTY':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ORDERLIST_CAN_NOT_EMPTY', []);
          case 'CUSTOMER_CAN_NOT_EMPTY':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.CUSTOMER_CAN_NOT_EMPTY', []);
          case 'ORDER_CUSTOMER_SAME_TIME_FILLED':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.ORDER_CUSTOMER_SAME_TIME_FILLED', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("notification save - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: saveNotifications
   * Purpose: saveNotifications
   * @param {*} req
   * @param {*} res
   * @returns
   */
  readNotifications = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await NotificationRequest.readNotifications(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await NotificationModel.readNotifications(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.NOTIFICATION_SUCCESSFULLY_READ", []);
    } catch (e) {
      console.log("notification read - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getNotificationByBatchId
   * Purpose: getNotificationByBatchId
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getNotificationByBatchId = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await NotificationRequest.getNotificationByBatchId(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await NotificationModel.getNotificationByBatchId(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObj = {}
      resObj["deliverLocationChange"] = response[0]
      resObj["routeSequenceNotFollowed"] = response[1]
      resObj["multipleBatchRequest"] = response[2]
      resObj["survey"] = response[3]

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("notification listing - controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }
}

module.exports = new NotificationController()