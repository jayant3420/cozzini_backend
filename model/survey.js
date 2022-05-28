"use strict";
const { max } = require("moment");
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");

class SurveyModel {
  /**
   * Method: getSurvey
   * Purpose: get list of survey type
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurvey = async (input) => {

    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getSurvey]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("survey catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getSurveyQuestion
   * Purpose: get list of survey question
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyQuestion = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("surveyId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.surveyId))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getSurveyQuestions]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("survey catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getSurveyQuestion
   * Purpose: get list of survey question
   * @param {*} req
   * @param {*} res
   * @returns
   */
  saveSurveyAnswer = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        input.surveyQuestionAnswer = (input.surveyQuestionAnswer) ? input.surveyQuestionAnswer : [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsEmployeeId))
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId))
        newParams.push(SqlQueryBuilder.SqlParameter("surveyId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.surveyId))
        newParams.push(SqlQueryBuilder.SqlParameter("questionAnswer", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.surveyQuestionAnswer)))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveSurveyAnswer]`, newParams).catch((err) => {reject(err)})
        if(dbRes){resolve(dbRes); }
      } catch (e) {
        console.log("survey catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getSurveyDetailAM
   * Purpose: get survey details for AM
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyDetailAM = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId))
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getSurveyDetailsAM]`, newParams)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset[0])
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("get survey details catch error ===>>> ", e);
        reject(e);
      }
    });
  };
  
  /**
   * Method: createSurvey
   * Purpose: create survey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  createSurvey = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        const questionItems = input.questionAnswer
        questionItems.map((item) => {
          if(item["answerType"] === 1) {
            item.options = JSON.stringify(item.options)
          }
        })

        const questionAnswer = {"questionItems": questionItems}
        // console.log("question answer ", questionItems)

        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("surveyName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.surveyName))

        newParams.push(SqlQueryBuilder.SqlParameter("questionAnswer", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(questionAnswer)))
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_createSurvey]`, newParams)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("create survey model - catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: updateSurvey
   * Purpose: updateSurvey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateSurvey = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {

        // const questionItems = input.questionAnswer
        // questionItems.map((item) => {
        //   if(item["answerType"] === 1) {
        //     item.options = JSON.stringify(item.options)
        //   }
        // })

        const questionAnswer = {"questionItems": input.questionAnswer}
        // console.log("question answer ", questionItems)

        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("surveyId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.surveyId))

        newParams.push(SqlQueryBuilder.SqlParameter("surveyName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.surveyName))

        newParams.push(SqlQueryBuilder.SqlParameter("questionAnswer", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(questionAnswer)))
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_updateSurvey]`, newParams)

        console.log("params", newParams)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("update survey model - catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: pastSurvey
   * Purpose: pastSurvey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  pastSurvey = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        if(input.nsCustomerId) {
          newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId))
        }
        
        if(input.routeId) {
          newParams.push(SqlQueryBuilder.SqlParameter("routeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.routeId))
        }
       
        if(input.startDate) {
          newParams.push(SqlQueryBuilder.SqlParameter("startDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.startDate))
        }
        
        if(input.endDate) {
          newParams.push(SqlQueryBuilder.SqlParameter("endDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 50, input.endDate))
        }
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getPastSurvey]`, newParams)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset[0] && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("past survey model - catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getSurveyById
   * Purpose: getSurveyById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyById = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("driverSurveyId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.driverSurveyId))
        
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getSurveyById]`, newParams)

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordsets)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("survey by id model - catch error ===>>> ", e);
        reject(e);
      }
    });
  };
}

module.exports.SurveyModel = new SurveyModel();
