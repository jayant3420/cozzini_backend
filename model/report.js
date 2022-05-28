"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class ReportModel {

  /**
   * Method: dashboardCountReport
   * Purpose: sign in user using username and password
   * @param {*} params
   * @returns
   */

  dashboardCountReport = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("amEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[am_getDashboardCountReport]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("dashboardCountReport catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: eodReportBatchId
   * Purpose: EOD report using batch-id
   * @param {*} input
   * @returns
   */
  eodReportBatchId = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_eodReportByBatchId]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("dashboardCountReport catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: eodReportRouteName
   * Purpose: EOD report using route-name
   * @param {*} input
   * @returns
   */
  eodReportRouteName = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.routeName));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_eodReportByRouteName]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("eod report by route name -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: paymentReport
   * Purpose: payment report
   * @param {*} input
   * @returns
   */
  paymentReport = (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getPaymentReport]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("payment report -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }


  /**
   * Method: deliveryWindowCS
   * Purpose: delivery window cs
   * @param {*} input
   * @returns
   */
  deliveryWindowCS = (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("weekType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.weekType));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getDeliveryWindowCS]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("delivery window cs -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: deliveryWindowAM
   * Purpose: delivery window am
   * @param {*} input
   * @returns
   */
  deliveryWindowAM = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("weekType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.weekType));

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getDeliveryWindowAM]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("delivery window am (model) -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: openRestaurrantsForm
   * Purpose: openRestaurrantsForm
   * @param {*} input
   * @returns
   */
  openRestaurrantsForm = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("openRestaurrantId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.openRestaurrantId));

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("businessForm", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.businessForm));

        newParams.push(SqlQueryBuilder.SqlParameter("billingName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.billingName));

        newParams.push(SqlQueryBuilder.SqlParameter("billingAddress", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.billingAddress));

        newParams.push(SqlQueryBuilder.SqlParameter("billingCity", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.billingCity));

        newParams.push(SqlQueryBuilder.SqlParameter("billingState", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.billingState));

        newParams.push(SqlQueryBuilder.SqlParameter("billingZipCode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 6, input.billingZipCode));

        newParams.push(SqlQueryBuilder.SqlParameter("phoneNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 15, input.billingZipCode));

        newParams.push(SqlQueryBuilder.SqlParameter("billingContact", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 15, input.billingZipCode));

        newParams.push(SqlQueryBuilder.SqlParameter("isOptOnlinceAccess", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isOptOnlinceAccess));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryCustomerName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.deliveryCustomerName));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryAddress", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.deliveryAddress));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryCity", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.deliveryCity));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryState", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.deliveryCity));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryZipCode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 6, input.deliveryZipCode));

        newParams.push(SqlQueryBuilder.SqlParameter("deliveryPhoneNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 15, input.deliveryPhoneNumber));

        newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.email));

        newParams.push(SqlQueryBuilder.SqlParameter("manager", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.email));

        newParams.push(SqlQueryBuilder.SqlParameter("isPaperInvoiceRequired", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isPaperInvoiceRequired));

        newParams.push(SqlQueryBuilder.SqlParameter("isEmailSignedInvoiceRequired", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Bit, null, input.isEmailSignedInvoiceRequired));

        newParams.push(SqlQueryBuilder.SqlParameter("dayOpened", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 5, input.dayOpened));

        newParams.push(SqlQueryBuilder.SqlParameter("paymentTerms", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.paymentTerms));

        newParams.push(SqlQueryBuilder.SqlParameter("knifeInventory", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.knifeInventory)));

        newParams.push(SqlQueryBuilder.SqlParameter("programs", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.programs));

        newParams.push(SqlQueryBuilder.SqlParameter("instructions", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.instructions)));

        newParams.push(SqlQueryBuilder.SqlParameter("authorisedBy", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.authorisedBy));

        newParams.push(SqlQueryBuilder.SqlParameter("title", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.authorisedBy));

        newParams.push(SqlQueryBuilder.SqlParameter("customerSignature", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.customerSignature));

        newParams.push(SqlQueryBuilder.SqlParameter("note", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.note));

        newParams.push(SqlQueryBuilder.SqlParameter("openWindow1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.openWindow1));

        newParams.push(SqlQueryBuilder.SqlParameter("openWindow2", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.openWindow2));

        newParams.push(SqlQueryBuilder.SqlParameter("closeWindow1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.closeWindow1));

        newParams.push(SqlQueryBuilder.SqlParameter("closeWindow2", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.closeWindow2));
        newParams.push(SqlQueryBuilder.SqlParameter("latitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.latitude));
        newParams.push(SqlQueryBuilder.SqlParameter("longitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Decimal(12, 9), null, input.longitude));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveOpenRestaurrants]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("open restaurrants model -- catch error ===>>> ", e);
        reject(e);
      }
    });
  }


  /**
   * Method: modifyKnifeQuantify
   * Purpose: modifyKnifeQuantify
   * @param {*} input
   * @returns
   */
  modifyKnifeQuantify = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const items = {"items" : input.items}

        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("items", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(items)));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_modifyKnifeQuantity]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if(Array.isArray(dbRes.recordset) && dbRes.recordset[0].error) {
            reject(dbRes.recordset[0].error)
          }
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("update knife inventory -- model error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: modifyProgram
   * Purpose: modifyProgram
   * @param {*} input
   * @returns
   */
  modifyProgram = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const items = {"items" : input.items}

        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("items", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(items)));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_modifyProgramQuantity]`, newParams);

        console.log(dbRes)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if(Array.isArray(dbRes.recordset) && dbRes.recordset[0].error) {
            reject(dbRes.recordset[0].error)
          }
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("modify program -- model error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: dashboardCountReportCS
   * Purpose: dashboardCountReportCS
   * @param {*} input
   * @returns
   */
  dashboardCountReportCS = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getCountDashboardCS]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("dashboardCountReport model - error ===>>> ", e);
        reject(e);
      }
    });
  };
}

module.exports.ReportModel = new ReportModel();
