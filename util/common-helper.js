"use strict";
const Constant = require("../config/constant");
const Config = require("../config/config");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const each = require("sync-each");
const azure = require('azure-storage');
const SqlQueryBuilder = require("./sql-query-builder");
class CommonHelper {
  /*
   * Method: convertInt
   * Purpose: To convert data in javascript number type
   * @param {*} value
   * @response {*} number type value
   */
  convertInt = (value) => {
    try {
      if (typeof value == "number") {
        return Number(value);
      } else {
        value = value ? value : "";
        value = value.replace(/[^0-9]/g, "");
        return isNaN(Number(value)) ? 0 : Number(value);
      }
    } catch (e) {
      return "";
    }
  };

  /*
   * Method: convertBool
   * Purpose: To convert data in javascript number type
   * @param {*} value
   * @response {*} number type value
   */
  convertBool = (value) => {
    let res = false;
    try {
      value = value ? value : false;
      if (typeof value == "number") {
        value = Number(value);
      } else if (typeof value == "boolean") {
        //value = (value);
      } else if (typeof value == "string") {
        value = value.toString();
      } else {
        value = (value ? value : "").toString();
        value = value.replace(/[^0-9]/g, "");
        value = isNaN(Number(value)) ? 0 : Number(value);
      }
      switch (value) {
        case 1:
          res = true;
          break;
        case 0:
          res = false;
          break;
        case "false":
          res = false;
          break;
        case "true":
          res = true;
          break;
        case "false":
          res = false;
          break;
        case "true":
          res = true;
          break;
        case false:
          res = false;
          break;
        case true:
          res = true;
          break;
      }
      return res;
    } catch (e) {
      return res;
    }
  };

  /**
   * Method: formatJoiError
   * Purpose: Formate array error message to single error string
   * @param {*} error
   * @param {*} LangMsg
   * @response {*} single error string
   */
  formatJoiError = (error, res) => {
    try {
      let errorType = error.details[0]["type"];
      console.log("error message ", errorType)
      var msg = "";
      switch (errorType) {
        case "object.unknown":
          if (res) {
            msg =
              error.details[0]["context"]["label"].toString() +
              " " +
              `${res.__("VALIDATION.IS_NOT_ALLOWED")}`;
            msg = msg.trim();
          } else {
            msg = error.details[0]["message"].toString();
            msg = msg.trim();
          }
          break;
        case "any.allowOnly":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "any.empty":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "string.empty":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "any.required":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "object.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "number.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "string.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "string.alphanum":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "string.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "string.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "string.email":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "boolean.base":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() + " " + msg;
          msg = msg.trim();
          break;
        case "number.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "number.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "array.max":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "array.min":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg.replace(
              "limit",
              error.details[0]["context"]["limit"].toString().trim(),
            );
          msg = msg.trim();
          break;
        case "any.only":
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg =
            error.details[0]["context"]["label"].toString().trim() +
            " " +
            msg +
            " " +
            error.details[0]["context"]["valids"];
          msg = msg.trim();
          break;
        default:
          msg = error.details[0]["message"]
            .replace(error.details[0]["context"]["label"], "")
            .toString();
          msg = error.details[0]["context"]["label"].toString() + msg;
          msg = msg.trim();
          //  msg = error.details[0]['message'].replace(error.details[0]['context']["label"], '').toString(); msg = msg.substring(2).trim();
          break;
      }
      // msg=msg.replace(msg[0],msg[0].toUpperCase());
      return msg;
    } catch (e) {
      return e.message;
    }
  };

  /**
   * Method: sendSuccess
   * Purpose: resonse formate create
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendSuccess(res, status, statusCode, message = null, data, total = null) {
    let resData = { success: status, data: data };
    if (total) {
      resData = Object.assign(resData, { total: total });
    }
    if (message) {
      resData = Object.assign(resData, {
        message:
          typeof message === "string"
            ? res.__(message)
            : res.__(message.key, message.value)
      });
    }
    res.status(statusCode).json(resData);
  }

  /**
   * Method: sendError
   * Purpose: error response formate
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendError = (res, status, statusCode, message, data = []) => {
    res.status(statusCode).json({
      success: status,
      message:
        typeof message === "string"
          ? res.__(message)
          : res.__(message.key, message.value),
      data: data,
    });
  };

  /**
   * Method: sendValidationError
   * Purpose: error response formate
   * @param {*} res
   * @param {*} status
   * @param {*} response
   * @response {*} http response
   */
  sendValidationError = (res, status, statusCode, message, data = []) => {
    res.status(statusCode).json({
      statusCode: statusCode,
      success: status,
      message: typeof message === "string" ? message : "",
      data: data,
    });
  };

  /**
   * Method: aesEncript
   * Purpose: encript string value
   * @param {*} planText
   * @response {*} encript string
   */
  aesEncript = (planText) => {
    try {
      //iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
      const iv = Buffer.from(Config.AES_CONFIG.SECRETIV_KEY);
      const key = Buffer.from(Config.AES_CONFIG.SECRET_KEY);
      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
      const encryptedData =
        cipher.update(planText, "utf8", "hex") + cipher.final("hex");
      return encryptedData;
    } catch (e) {
      return "";
    }
  };

  /**
   * Method: aesDecript
   * Purpose: Decript string to normal string
   * @param {*} encryptedText
   * @response {*} normal string
   */
  aesDecript = (encryptedText) => {
    try {
      //iv needs to be 16bytes long, key is 32bytes. And we changed createCipher to createCipheriv.
      encryptedText = encryptedText.toString();
      let iv = Buffer.from(Constant.AES_CONFIG.SECRETIV_KEY);
      let key = Buffer.from(Constant.AES_CONFIG.SECRET_KEY);
      let cipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
      let encryptedData =
        cipher.update(encryptedText, "hex", "utf8") + cipher.final("utf8");
      return encryptedData;
    } catch (e) {
      return "";
    }
  };

  /**
   * Method: hashingPassword
   * Purpose : hash password
   */
  hashingPassword = async (password) => {
    if (password) {
      const hash = await bcrypt.hashSync(
        password,
        Number(Constant.SALT_ROUNDS),
      );
      return hash;
    } else {
      return null;
    }
  };

  /**
   * Method: hashingCompairPassword
   * Purpose : hash compare password
   */
  hashingComparePassword = (password, hashPassword) => {
    if (password) {
      const hash = bcrypt.compareSync(password, hashPassword);
      return hash;
    } else {
      return null;
    }
  };

  /**
   * Method: getHashText
   * Purpose: value convert to md5 string
   * @param {*} base64Text
   * @response {*} md5 string
   */
  getHashText = async (text) => {
    try {
      return crypto.createHash("md5").update(text).digest("hex");
    } catch (e) {
      return "";
    }
  };

  createSqlPoolConnection = () => {
    return new Promise((resolve, reject) => {
      try {
        SqlQueryBuilder.CreatePoolPromise((err, pool) => {
          if (err) {
            console.log("CreatePoolPromise error ==>>", err);
            reject("DB_NOT_CONNECTED");
          } else {
            global.SqlGlobalCon = pool;
            resolve(true);
          }
        });
      } catch (e) {
        reject("DB_NOT_CONNECTED");
      }
    });
  };

  generateSasToken = (input) => {
    return new Promise(function (resolve, reject) {
      try {
        var connString = Config.AZURE_STORAGE_CONNECTION_STRING;
        var blobService = azure.createBlobService(connString);
        // Create a SAS token that expires in an hour
        // Set start time to five minutes ago to avoid clock skew.
        var startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 5);
        var expiryDate = new Date(startDate);
        expiryDate.setMinutes(startDate.getMinutes() + 60);

        var sharedAccessPolicy = {
          AccessPolicy: {
            Permissions: azure.BlobUtilities.SharedAccessPermissions.WRITE,
            Start: startDate,
            Expiry: expiryDate
          }
        };
        var sasToken = blobService.generateSharedAccessSignature(input.containerName, input.imageName, sharedAccessPolicy);
        var azureSas = {
          token: sasToken,
          uri: blobService.getUrl(input.containerName, input.imageName, sasToken, true)
        };
        resolve(azureSas)
      } catch (e) {
        console.log(e);
        reject(false);
      }
    });
  };
}

module.exports.CommonHelper = new CommonHelper();
