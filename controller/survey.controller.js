"use strict";
const Constant = require("../config/constant");
const { SurveyRequest } = require("../request-schema/survey-request");
const { SurveyModel } = require("../model/survey");
const { CommonHelper } = require("../util/common-helper");

class SurveyController {
  /**
   * Method: getSurvey
   * Purpose: get list of survey type
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurvey = async (req, res) => {
    try {
      const input = req.query;
      const response = await SurveyModel.getSurvey(input).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("Login catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getSurveyQuestion
   * Purpose: get list of survey question
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyQuestion = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await SurveyRequest.getSurveyQuestion(res).validate(input);

      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.getSurveyQuestion(input).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_200_OK, "DATABASE.RECORD_FETCH", response.map(obj => { obj.questionId=parseInt(obj.questionId); if (obj.questionOption) { obj.questionOption = JSON.parse(obj.questionOption) } else { obj.questionOption = [] } return obj; }));
      
    } catch (e) {
      console.log("Login catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getSurveyQuestion
   * Purpose: get list of survey question
   * @param {*} req
   * @param {*} res
   * @returns
   */
  saveSurveyAnswer = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await SurveyRequest.saveSurveyAnswer(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.saveSurveyAnswer(input).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.SURVEY_RECORD_CREATED", []);
    } catch (e) {
      console.log("save survey catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: getSurveyDetailAM
   * Purpose: get survey detail for AM
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyDetailAM = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await SurveyRequest.getSurveyDetailAM(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.getSurveyDetailAM(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'SURVEY_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }

      response["questionAnswers"] = JSON.parse(response["questionAnswers"])
 
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("fetch survey record catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: createSurvey
   * Purpose: createSurvey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  createSurvey = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await SurveyRequest.createSurvey(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.createSurvey(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'SURVEY_NAME_ALREADY_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_NAME_ALREADY_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
 
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("create survey controller - catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

  /**
   * Method: updateSurvey
   * Purpose: updateSurvey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateSurvey = async (req, res) => {
    try {
      const input = req.body;
      const { error, value } = await SurveyRequest.updateSurvey(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.updateSurvey(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'SURVEY_ID_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_ID_NOT_EXISTS', []);
          case 'SURVEY_NAME_ALREADY_EXISTS':
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_NAME_ALREADY_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
 
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.DATA_SUCCESSFULLY_SAVED", []);
    } catch (e) {
      console.log("update survey controller - catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: pastSurvey
   * Purpose: pastSurvey
   * @param {*} req
   * @param {*} res
   * @returns
   */
  pastSurvey = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await SurveyRequest.pastSurvey(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.pastSurvey(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'START_DATE_BLANK_ERROR':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.START_DATE_BLANK_ERROR', []);
          case 'END_DATE_BLANK_ERROR':
              return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.END_DATE_BLANK_ERROR', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
 
      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", response);
    } catch (e) {
      console.log("past survey controller - catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };


  /**
   * Method: getSurveyById
   * Purpose: getSurveyById
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getSurveyById = async (req, res) => {
    try {
      const input = req.query;
      const { error, value } = await SurveyRequest.getSurveyById(res).validate(input);
      if (error && error.details[0]) {
        return CommonHelper.sendValidationError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, CommonHelper.formatJoiError(error, res), []);
      }
      const response = await SurveyModel.getSurveyById(value).catch((err) => {
        switch (err) {
          case 'INVALID_REQUEST':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.INVALID_REQUEST', []);
          case 'SURVEY_NOT_EXISTS':
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_400_BAD_REQUEST, 'DATABASE.SURVEY_NOT_EXISTS', []);
          default:
            return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "DATABASE.SOMETHING_WENT_WRONG", []);
        }
      });

      if (!response) { return; }
 
      console.log("response", response)

      const resObj = {}
      resObj["customerDetails"] = response[0][0]
      resObj["surveyQuestionDetails"] = JSON.parse(response[1][0]["surveyResponse"])

      return CommonHelper.sendSuccess(res, true, Constant.STATUS_CODE.HTTP_201_CREATED, "DATABASE.RECORD_FETCH", resObj);
    } catch (e) {
      console.log("survey by id controller - catch error ==>>", e);
      return CommonHelper.sendError(res, false, Constant.STATUS_CODE.HTTP_500_INTERNAL_SERVER_ERROR, "SERVER.SOMETHING_WENT_WRONG", []);
    }
  };

}

module.exports = new SurveyController();
