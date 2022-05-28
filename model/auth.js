"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class AuthModel {
  /**
   * Method: signIn
   * Purpose: sign in user using username and password
   * @param {*} params
   * @returns
   */

  signIn = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.email));
        newParams.push(SqlQueryBuilder.SqlParameter("loginType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.loginType));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_signIn]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_USER");
        }
      } catch (e) {
        console.log("sign in catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: SaveRefreshToken
   * Purpose: save refresh token in the database for the feature usage
   * @param {*} params
   * @returns
   */
  saveRefreshToken = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("userId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("deviceToken", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.deviceToken));
        newParams.push(SqlQueryBuilder.SqlParameter("refreshToken", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.refreshToken));
        newParams.push(SqlQueryBuilder.SqlParameter("deviceType", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.deviceType));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveRefreshToken]`, newParams).catch((err) => {
          reject(err);
        });
        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Save Refresh Token catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: changePassword
   * Purpose: To change the user password
   * @param {*} params
   * @returns
   */
  changePassword = async (newHashedPassword, email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, email));
        newParams.push(SqlQueryBuilder.SqlParameter("newPassword", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, newHashedPassword));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_areaManagerChangePassword]`, newParams).catch((err) => {
          reject(err);
        });
        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get profile user catch error ===>>> ", e);
        reject(e);
      }
    })
  }

  /**
   * Method: getPassword
   * Purpose: To get the password of user
   * @param {*} params
   * @returns
   */
  getPassword = async (employeeEmail) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("email", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 255, employeeEmail));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getPassword]`, newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset[0] && dbRes.recordset[0].password)
            resolve({ status: true, data: dbRes.recordset[0].password });
          else
            reject("INVALID_USER");
        } else {
          reject("INVALID_USER");
        }

      } catch (e) {
        console.log("Get password catch error ===>>> ", e);
        reject(e);
      }
    })
  }

  /**
   * Method: getEmails
   * Purpose: To get all the emails
   * @param {*} params
   * @returns
   */
  getEmails = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.routeName));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getEmails]`, newParams).catch((err) => {
          reject(err);
        });

        // console.log(dbRes.recordsets)

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordsets);
        } else {
          reject("INVALID_USER");
        }

      } catch (e) {
        console.log("Get Emails catch error ===>>> ", e);
        reject(e);
      }
    })
  }

  /**
   * Method: updateEmail
   * Purpose: To update the employee email
   * @param {*} params
   * @returns
   */
  updateEmail = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("newEmail", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.newEmail));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_emailUpdate]`, newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(true);
        } else {
          reject("INVALID_USER");
        }

      } catch (e) {
        console.log("update email catch error ===>>> ", e);
        reject(e);
      }
    })
  }
}

module.exports.AuthModel = new AuthModel();
