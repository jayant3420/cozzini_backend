"use strict";
const Constant = require("../config/constant");
const { MasterDataRequest } = require("../request-schema/master-data-request");
const { MasterDataModel } = require("../model/master-data");
const { CommonHelper } = require("../util/common-helper");

class MasterDataController {
  /**
   * Method: getMasterData
   * Purpose: get list of master records
   * @param {*} req
   * @param {*} res
   * @returns
   */
   getMasterData = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId;
      const response = await MasterDataModel.getMasterData(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const resObject = {}
      resObject["todayRoute"] = response[0]
      
      response[1] && response[1].map((obj) => {
        if(obj.OrderLines) {
          obj.OrderLines = JSON.parse(obj.OrderLines)
        } else {
          obj.OrderLines = []
        }
      })
      resObject["orderList"] = response[1]

      response[2] && response[2].map((obj) => {
        if(obj.customerContacts) {
          obj.customerContacts = JSON.parse(obj.customerContacts)
        } else {
          obj.customerContacts = []
        }
      })
      resObject["customerList"] = response[2]

      resObject["skippedReasonList"] = response[3]
      resObject["invoiceList"] = response[4]

      response[5] && response[5].map((obj) => {
        if(obj.surveyQuestions) {
          obj.surveyQuestions = JSON.parse(obj.surveyQuestions)
        } else {
          obj.surveyQuestions = []
        }
      })
      resObject["surveyList"] = response[5]

      resObject["kimsInventory"] = response[6]
      response[7] && response[7].map((obj) => {

        if(obj.items) {

          obj.items = JSON.parse(obj.items)

        } else {

          obj.items = []

        }

      })
      resObject["programs"] = response[7]
      resObject["items"] = response[8]
      resObject["itemDropdownLabel"] = response[9]
      resObject["frequency"] = response[10]
      resObject["frequencies"] = response[11]
      resObject["sharpningCenter"] = response[12]
      resObject["kimsInventoryItems"] = response[13]
      // resObject["kimsCutleryTypes"] = response[14]

      response[14] && response[14].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      })
      resObject["oneTimeSales"] = response[14]

      response[15] && response[15].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      })
      resObject["programRequest"] = response[15]

      response[16] && response[16].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      })
      resObject["knifeInventoryRequest"] = response[16]

      resObject["Notifications"] = response[17]
      // console.log(resObject)

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObject);

    } catch (e) {
      console.log("Master data controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  masterSavePayment= async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = MasterDataRequest.masterSavePayment(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      console.log("after validation>>>>>>>>>>>>>>",value)
      const response = await MasterDataModel.masterSavePayment(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.PAYMENT_COMPLETED", []);
    } catch (e) {
      console.log("masterSavePayment catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getMasterRequests
   * Purpose: get master requests
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getMasterRequests = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await MasterDataModel.getMasterRequests(nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }

      const resObject = {}
      
      response[0].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      }) 
      resObject["oneItemSales"] = response[0]

      response[1].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      }) 
      resObject["programRequest"] = response[1]

      response[2].map((obj) => {
        if(obj.items) {
          obj.items = JSON.parse(obj.items)
        } else {
          obj.items = []
        }
      }) 
      resObject["knifeInventoryRequest"] = response[2]

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", resObject);
    } catch (e) {
      console.log("master request catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }
}

module.exports = new MasterDataController();
