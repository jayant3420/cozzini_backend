"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class CustomerModel {
  /**
   * Method: getCustomers
   * Purpose: Get customers from db
   * @param {*} params
   * @returns
   */
  getCustomers =  async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("pageNo", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.pageNo));
        newParams.push(SqlQueryBuilder.SqlParameter("pageSize", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.pageSize));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCustomers]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customers catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: locationChangeRequest
   * Purpose:  Location change request submit to DB by driver
   * @param {*} params
   * @returns
   */
  locationChangeRequest = async (input, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, user.nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("latitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.latitude));
        newParams.push(SqlQueryBuilder.SqlParameter("longitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.longitude));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_deliveryLocationChangeRequest]`, newParams);
        // console.log("DB response ===>>> ", JSON.stringify(dbRes));
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          if (dbRes.recordset[0]['dbError']) {
            reject(dbRes.recordset[0]['dbError']);
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
          // reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customers catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getCustomerContacts
   * Purpose:  To get the customer contacts
   * @param {*} params
   * @returns
   */
  getCustomerContacts = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getCustomerContacts]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length >= 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer contact model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getCustomerById
   * Purpose:  To get the customer details by it
   * @param {*} params
   * @returns
   */
  getCustomerById = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getCustomerById]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          if (dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordset);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer details catch error ===>>> ", e);
        reject(e);
      }
    });
  }


  /**
   * Method: getCustomerByRouteName
   * Purpose:  To get the customer details by route name
   * @param {*} params
   * @returns
   */
  getCustomerByRouteName = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsRouteId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsRouteId));

        newParams.push(SqlQueryBuilder.SqlParameter("supervisor", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCustomersByRouteName]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer details catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getCustomerNote
   * Purpose:  To get the customer notes
   * @param {*} params
   * @returns
   */
  getCustomerNote = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getCustomerNotes]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          if (dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordset);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer notes get catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: updateCustomerNote
   * Purpose:  To update the customer note
   * @param {*} params
   * @returns
   */
  updateCustomerNote = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));

        newParams.push(SqlQueryBuilder.SqlParameter("note", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.note));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[saveCustomerNote]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(true);
          }
        } else {
          reject("INVALID_REQUEST")
        }
      } catch (e) {
        console.log("customer notes get catch error ===>>> " + e);
        reject(e);
      }
    });
  }

  addCustomerContact = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("contactName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.contactName));
        newParams.push(SqlQueryBuilder.SqlParameter("contactSignature", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, sql.MAX, input.contactSignature));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_addCustomerContact]`, newParams);
        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer details catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  deleteCustomerContact = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("contactId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.contactId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_deleteCustomerContact]`, newParams);
        console.log(dbRes)
        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer details catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  emailInvoices = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.email));
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.employeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("invoices", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.invoices)));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[saveEmailInvoices]`, newParams);
        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("emailInvoices catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: customerDetailsAM
   * Purpose:  To get the customer details
   * @param {*} params
   * @returns
   */
  customerDetailsAM = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCustomerDetailAM]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset[0] && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordsets);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer details by model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: customerContactList
   * Purpose:  To get the customer contact list
   * @param {*} params
   * @returns
   */
  customerContactList = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCustomerContactList]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset[0] && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordset);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer contact list model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  addCustomerCard = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("cardNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.cardNumber));
        newParams.push(SqlQueryBuilder.SqlParameter("cardBrand", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.cardBrand));
        newParams.push(SqlQueryBuilder.SqlParameter("cardType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.cardType));
        newParams.push(SqlQueryBuilder.SqlParameter("expirationDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.expirationDate));
        newParams.push(SqlQueryBuilder.SqlParameter("nameOnCard", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.nameOnCard));
        newParams.push(SqlQueryBuilder.SqlParameter("card4Digit", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.card4Digit));
        newParams.push(SqlQueryBuilder.SqlParameter("zipCode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.zipCode));
        newParams.push(SqlQueryBuilder.SqlParameter("street", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.street));
        newParams.push(SqlQueryBuilder.SqlParameter("pstate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.state));
        newParams.push(SqlQueryBuilder.SqlParameter("memo", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.memo));
        newParams.push(SqlQueryBuilder.SqlParameter("isDefault", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isDefault));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_addCustomerCard]`, newParams);
    
        if (dbRes && dbRes.recordsets && dbRes.recordsets.length > 0 && dbRes.recordsets[0] && dbRes.recordsets[0][0]) {
          resolve(dbRes.recordsets[0][0]);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("add customer card catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: driverTodayReport
   * Purpose:  driver today report
   * @param {*} params
   * @returns
   */
  driverTodayReport = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("reportDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.reportDate));

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_driverTodayReport]`, newParams);

        if (dbRes && dbRes.recordsets && dbRes.recordsets.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("driver today report model -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getCustomerSurvey
   * Purpose:  getCustomerSurvey
   * @param {*} params
   * @returns
   */
  getCustomerSurvey = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));

        newParams.push(SqlQueryBuilder.SqlParameter("surveyId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.surveyId));
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCustomerSurveyQuestion]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset[0] && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordset);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("customer survey model -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }

}

module.exports.CustomerModel = new CustomerModel()