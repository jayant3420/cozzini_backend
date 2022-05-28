"use strict";
const { max } = require("moment");
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class MasterDataModel {
  /**
   * Method: getMasterData
   * Purpose: get list of master record
   * @param {*} req
   * @param {*} res
   * @returns
   */
   getMasterData = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getMasterData]`, newParams);

        if (dbRes && dbRes.recordsets && dbRes.recordsets.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("master data catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  masterSavePayment = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        console.log(data)
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[masterSavePayment]`, newParams);
        console.log(">>>",dbRes)
        if (dbRes && dbRes.recordsets && dbRes.recordsets.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("master data catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getMasterRequests
   * Purpose: get master requests
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getMasterRequests = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId))

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getMasterRequests]`, newParams);
        console.log(">>>",dbRes)
        if (dbRes && dbRes.recordsets && dbRes.recordsets.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("master requests model catch error ===>>> ", e);
        reject(e);
      }
    });
  };
}

module.exports.MasterDataModel = new MasterDataModel();
