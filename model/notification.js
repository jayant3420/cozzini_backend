"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class NotificationModel {
  /**
   * Method: notificationList
   * Purpose: getting notification 
   * @param {*} params
   * @returns
   */
  getNotificationList = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("loginType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.TinyInt, null, input.loginType));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getNotificationListAM]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset.length > 0 && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(dbRes.recordsets);
          }
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("notification list model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getNotificationFilterData
   * Purpose: getNotificationFilterData 
   * @param {*} params
   * @returns
   */
  getNotificationFilterData = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {

        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("loginType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.loginType));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getNotificationFilterData]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("notification filter data - model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getNotificationFilterValueBasedData
   * Purpose: getNotificationFilterValueBasedData 
   * @param {*} params
   * @returns
   */
  getNotificationFilterValueBasedData = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("state", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.state));

        newParams.push(SqlQueryBuilder.SqlParameter("loginType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.loginType));

        if(input.routeName) {
          newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(JSON.parse(input.routeName).routeName)));
        }
        
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getNotificaitonFilter]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("notification value based filtering - model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getNotificationOrders
   * Purpose: getNotificationOrders 
   * @param {*} params
   * @returns
   */
  getNotificationOrders = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("state", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.state));

        if (input.routeName) {
          newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(JSON.parse(input.routeName).routeName)));
        }

        if (input.nsDriverId) {
          newParams.push(SqlQueryBuilder.SqlParameter("nsDriverId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(JSON.parse(input.nsDriverId).nsDriverId)));
        }

        if (input.batchId) {
          newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(JSON.parse(input.batchId).batchId)));
        }

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getOrdersForNotification]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets[0]);
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("notification orders list - model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: saveNotifications
   * Purpose: saveNotifications 
   * @param {*} params
   * @returns
   */
  saveNotifications = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("message", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.message));

        newParams.push(SqlQueryBuilder.SqlParameter("notificationSentTo", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.notificationSentTo));

        if (input.notificationDate) {
          newParams.push(SqlQueryBuilder.SqlParameter("notificationDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.notificationDate));
        }

        if (input.day) {
          newParams.push(SqlQueryBuilder.SqlParameter("day", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 30, input.day));
        }

        if (input.orderIdList) {
          newParams.push(SqlQueryBuilder.SqlParameter("orderIdList", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.orderIdList)));
        }

        if (input.customerList) {
          newParams.push(SqlQueryBuilder.SqlParameter("customerList", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.customerList)));
        }

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        console.log("params", newParams)

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveNotification]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset && dbRes.recordset.length > 0 && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(true);
          }
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("notification save - model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
  * Method: readNotifications
  * Purpose: readNotifications 
  * @param {*} params
  * @returns
  */
  readNotifications = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("notifications", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.notifications)));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_readNotification]`, newParams);

        // if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
        // if (dbRes.recordset && dbRes.recordset.length > 0 && dbRes.recordset[0]['error']) {
        //   reject(dbRes.recordset[0]['error']);
        // } else {
        resolve(true);
        // }
        // } else {
        //   reject("INVALID_USER");
        // }
      } catch (e) {
        console.log("notification save - model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
  * Method: getNotificationByBatchId
  * Purpose: getNotificationByBatchId 
  * @param {*} params
  * @returns
  */
  getNotificationByBatchId = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("routeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.routeId));

        newParams.push(SqlQueryBuilder.SqlParameter("selectedDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.selectedDate));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getNotificationListRouteId]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
        
      } catch (e) {
        console.log("notification list - model catch error ===>>> ", e);
        reject(e);
      }
    });
  }
}

module.exports.NotificationModel = new NotificationModel();
