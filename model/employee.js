"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class EmployeeModel {
  saveDriverHealthLog = async (input, driverTokenData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const driverHealthLogs = { "driverHealthLogs": (Array.isArray(input.driverHealthLogs) && input.driverHealthLogs.length > 0) ? input.driverHealthLogs : [] };
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, driverTokenData.nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("driverHealthLogs", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(driverHealthLogs)))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveDriverHealthLog]`, newParams).catch((err) => {
          reject(err);
        });
        resolve(true);
      } catch (e) {
        console.log("driver health log catch error ===>>> ", e);
        reject(e);
      }
    });
  }
}

module.exports.EmployeeModel = new EmployeeModel()