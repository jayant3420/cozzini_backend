"use strict";
const Constant = require("../config/constant");
const { CustomerRequest } = require("../request-schema/customer-request");
const { CustomerModel } = require("../model/customer");
const { CommonHelper } = require("../util/common-helper");
const ejs = require('ejs');

class CustomerController {
  /**
   * Method: getCustomers
   * Purpose: get customer details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomers = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await CustomerRequest.getCustomers(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CustomerModel.getCustomers(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      const total = Array.isArray(response) && response.length > 0 ? response[0].total : 0

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response.map((item) => { delete item.total; return item; }), total);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: locationChangeRequest
   * Purpose: Location change request submit by driver
   * @param {*} req
   * @param {*} res
   * @returns
   */
  locationChangeRequest = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.locationChangeRequest(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.locationChangeRequest(value, req.user).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'ALREADY_EXIST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.LOCATION_REQUEST_ALREADY_EXIST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.LOCATION_REQUEST_SUBMITTED_SUCCESS", response);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getCustomerContacts
   * Purpose: To get the contacts detail of a customer
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomerContacts = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.getCustomerContacts(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.getCustomerContacts(value).catch((err) => {
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

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getCustomerById
   * Purpose: To get the customer details by id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomerById = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.getCustomerById(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CustomerModel.getCustomerById(value).catch((err) => {
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

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getCustomerByRouteName
   * Purpose: To get the customer details by route name
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomerByRouteName = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.getCustomerByRouteName(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const nsEmployeeId = req.user.nsEmployeeId
      const response = await CustomerModel.getCustomerByRouteName(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      })

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: getCustomerNote
   * Purpose: To get the customer notes
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomerNote = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.getCustomerNote(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CustomerModel.getCustomerNote(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.CUSTOMER_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response[0]);
    } catch (e) {
      console.log("customer note catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: updateCustomerNote
   * Purpose: To update the customer note
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateCustomerNote = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.updateCustomerNote(res).validate(input);
      //Validation error sending, if error generated
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CustomerModel.updateCustomerNote(value).catch((err) => {
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

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.NOTE_UPDATED", []);
    } catch (e) {
      console.log("customer note catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  addCustomerContact = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.addCustomerContact(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.addCustomerContact(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.CUSTOMER_CONTACT_ADDED", []);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  deleteCustomerContact = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.deleteCustomerContact(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.deleteCustomerContact(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.CUSTOMER_CONTACT_DELETED", []);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
  * Method: customerContactList
  * Purpose: To get the customer and their contact list
  * @param {*} req
  * @param {*} res
  * @returns
  */
  customerContactList = async (req, res) => {
    try {
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await CustomerModel.customerContactList(nsEmployeeId).catch((err) => {
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
      console.log("customer contact list catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }


  emailInvoices = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.emailInvoices(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      value.employeeId = req.user.nsEmployeeId;
      const response = await CustomerModel.emailInvoices(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.EMAIL_INVOICE_INSERTED", []);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: customerDetailsAM
   * Purpose: To get the customer details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  customerDetailsAM = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.customerDetailsAM(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.customerDetailsAM(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'CUSTOMER_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.EMPLOYEE_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }

      const resObj = {}

      const tempObj1 = response[0][0]
      if(tempObj1 && tempObj1["contact"]) {
        tempObj1["contact"] = JSON.parse(tempObj1["contact"])
      }
      resObj["customerDetails"] = tempObj1 ? tempObj1 : []
      resObj["customerInvoiceDetails"] = response[1]

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("customer details catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  addCustomerCard = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = CustomerRequest.addCustomerCard(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await CustomerModel.addCustomerCard(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.CUSTOMER_CARD_ADDED", response);
    } catch (e) {
      console.log("customer catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

  /**
   * Method: driverTodayReport
   * Purpose: to get the driver eod report
   * @param {*} req
   * @param {*} res
   * @returns
   */
  driverTodayReport = async (req, res) => {
    try {
      const input = req.query;
      
      // 
      const { error, value } = CustomerRequest.driverTodayReport(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      // const nsEmployeeId = req.user.nsEmployeeId
      const nsEmployeeId = req.user.nsEmployeeId
      const response = await CustomerModel.driverTodayReport(value, nsEmployeeId).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });
      
      console.log("response", response)

      // console.log(response)
      const reportHeaderData = (response[0] && Array.isArray(response[0]) && response[0].length > 0) ? response[0][0] : {}

      const reportDeliveredOrder = (response[1] && Array.isArray(response[1]) && response[1].length > 0) ? response[1].filter((item) => item.isCompleted == true) : []

      const reportUndeliveredOrder = (response[1] && Array.isArray(response[1]) && response[1].length > 0) ? response[1].filter((item) => item.isCompleted == false) : []

      const reportPaymentData = response[2]

      // console.log(response)

      if (!response) { return; }
      // res.render('report.ejs', {reportHeaderData, reportDeliveredOrder, reportUndeliveredOrder, reportPaymentData});
      const htmlData = await ejs.renderFile('views/report.ejs', {reportHeaderData, reportDeliveredOrder, reportUndeliveredOrder, reportPaymentData});
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", htmlData);
    } catch (e) {
      console.log("driver today report -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }


  /**
   * Method: getCustomerSurvey
   * Purpose: to get the customer survey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getCustomerSurvey = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = CustomerRequest.getCustomerSurvey(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }

      const response = await CustomerModel.getCustomerSurvey(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'CUSTOMER_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.CUSTOMER_NOT_EXISTS', []);
          case 'SURVEY_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if(!response) { return }
      
      response && response.length > 0 && response.map((item) => {
        if(item.questionOption) {
          item.questionOption = JSON.parse(item.questionOption)
        }
        return item
      })

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("cutomer survey -- controller catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  }

}

module.exports = new CustomerController();