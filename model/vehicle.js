"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class VehicleModel {


  /**
   * Method: getEmployeeVehicles
   * Purpose: get employee vehicle details from database
   * @param {*} params
   */
  getEmployeeVehicles = async (employeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, employeeId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getEmployeeVehicles]", newParams).catch((err) => reject(err));

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get route stop error ==>", e);
        reject(e);
      }
    });
  };

  /**
   * Method: vehicleInspection
   * Purpose: Submitting vehicle inspection answers
   * @param {*} params
   */
   vehicleInspection = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("vehicleId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.vehicleId));

        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 25, input.batchId));
        
        newParams.push(SqlQueryBuilder.SqlParameter("remarks", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.remarks));

        newParams.push(SqlQueryBuilder.SqlParameter("data", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.data)));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_postVehicleInspectionQuestions]", newParams)
        .catch((error) => {
          reject(error);
        });

        if(dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          // if (dbRes && dbRes.recordset[0] && dbRes.recordset[0]["error"]) {
          //   reject(dbRes.recordset[0]["error"]);
          // }
          resolve(true);
        } else {
          reject("INVALID_USER")
        }
      } catch (e) {
        console.log("Post inspection questions error ===>>", e);
        reject(e);
      }
    });
  };

  /**
  * Method: logStartEndTime
  * Purpose: Submitting vehicle inspection answers
  * @param {*} params
  */
  logStartEndTime = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("nsRouteId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsRouteId));
        newParams.push(SqlQueryBuilder.SqlParameter("requestType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, input.requestType));
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_logStartEndTiming]", newParams).catch((err) => {reject(err);});

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve({ status: true, message: "Data saved successfully" });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("Start and End time error ===>>", err);
        reject(err);
      }
    });
  };

  /**
   * Method: addVehicle
   * Purpose: Add vehicle into database
   * @param {*} params
   */
  addVehicle = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("vinNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, input.vinNumber));
        newParams.push(SqlQueryBuilder.SqlParameter("vehicleName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, input.vehicleName));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_addVehicle]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve({ status: true, message: "DATABASE.DATA_SUCCESSFULLY_SAVED" });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("add vehicle error ==>>", err);
        reject(err);
      }
    })
  }


  /**
   * Method: deleteVehicle
   * Purpose: Delete vehicle from database
   * @param {*} params
   */
  deleteVehicle = (input, nsEmployeeId) => {
    console.log(nsEmployeeId)
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("vehicleId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, input.vehicleId));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_deleteVehicle]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve({ status: true, message: "DATABASE.VEHICLE_DELETED_SUCCESSFULLY" });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("delete vehicle error ==>>", err);
        reject(err);
      }
    })
  }

  /**
   * Method: getEmployeeVehiclesAM
   * Purpose: employee vehicle getting from db
   * @param {*} params
   */
  getEmployeeVehiclesAM = (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getVehicleListAM]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("delete vehicle error ==>>", err);
        reject(err);
      }
    })
  }

  /**
   * Method: saveVehicleAM
   * Purpose: saveVehicleAM
   * @param {*} params
   */
  saveVehicleAM = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("vinNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 25, input.vinNumber));

        newParams.push(SqlQueryBuilder.SqlParameter("vehicleName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.vehicleName));

        newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.routeName));

        newParams.push(SqlQueryBuilder.SqlParameter("driverName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.driverName));

        newParams.push(SqlQueryBuilder.SqlParameter("year", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.year));

        newParams.push(SqlQueryBuilder.SqlParameter("make", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.make));

        newParams.push(SqlQueryBuilder.SqlParameter("model", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.model));

        newParams.push(SqlQueryBuilder.SqlParameter("series", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.series));

        newParams.push(SqlQueryBuilder.SqlParameter("licenseState", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 100, input.licenseState));

        newParams.push(SqlQueryBuilder.SqlParameter("licenseNum", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 40, input.licenseNum));

        newParams.push(SqlQueryBuilder.SqlParameter("licenseExpDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, null, input.licenseExpDate));

        newParams.push(SqlQueryBuilder.SqlParameter("fleetVehicleStatus", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.fleetVehicleStatus));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_saveVehicleAM]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("add vehicle am - model catch error ==>>", err);
        reject(err);
      }
    })
  }

  /**
   * Method: vehicleNickname
   * Purpose: vehicleNickname
   * @param {*} params
   */
  vehicleNickname = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("vehicleId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.vehicleId));

        newParams.push(SqlQueryBuilder.SqlParameter("nickName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.nickName));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_updateEmployeeVehicleName]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["isError"]) {
            reject(dbRes.recordset[0]["isError"]);
          }
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (err) {
        console.log("add nickname - model error ==>>", err);
        reject(err);
      }
    })
  }
}

module.exports.VehicleModel = new VehicleModel();
