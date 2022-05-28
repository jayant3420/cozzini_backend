"use strict";
const sql = require("mssql");
const SqlQueryBuilder = require("../util/sql-query-builder");
const moment = require("moment");

class RouteModel {
  /**
   * Method : getRoutes
   * Purpose : To get the driver's route from database for the current week
   * @param {*} params
   * @returns
  */
  getRoutes = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getTodayRoutes]", newParams).catch((err) => reject(err));

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get user route error ==>", e);
        reject(e);
      }
    });
  };


  /**
   * Method : getRouteStops
   * Purpose : To get the stops for a specific route
   * @param {*} params
   * @returns
  */
  getRouteStops = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getRouteStops]", newParams).catch((err) => reject(err));

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
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
   * Method : getCompletedStops
   * Purpose : To get the completed-stops for a specific route from database
   * @param {*} params
   * @returns
  */
  getCompletedStops = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("employeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getCompletedStop]", newParams).catch((err) => reject(err));

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get completed stops error ===>>", e);
        reject(e);
      }
    });
  };

  /**
   * Method : getSkippedStops
   * Purpose : To get the skipped-stops for a specific route from database
   * @param {*} params
   * @returns
  */
  getSkippedStops = (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getSkippedStop]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get skipped stops error ===>>", err);
        reject(err);
      }
    });
  };


  /**
   * Method : getIncompletedStops
   * Purpose : To get the incompleted-stops for a specific route from database
   * @param {*} params
   * @returns
  */
  getIncompletedStops = (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 20, input.batchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getIncompleteStop]", newParams).catch((err) => {
          reject(err);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get skipped stops error ===>>", err);
        reject(err);
      }
    });
  };


  /**
   * Method: unskippedStops
   * Purpose: To reschedule the order delivery
   * @param {*} params
   */
  unskippedStops = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const inputDataArray = input.orderId;
        const orderArray = [];
        const newParams = [];

        inputDataArray.forEach((item) => {
          orderArray.push({ "unskippedOrderId": item })
        });

        newParams.push(SqlQueryBuilder.SqlParameter("orderArray", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(orderArray)));

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_unSkippedOrders]", newParams)
          .catch((error) => {
            reject(error);
          });

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Unskipped stops error ===>>", e);
        reject(e);
      }
    });
  };


  /**
   * Method: getUnskippedStopsList
   * Purpose: To get all the unskipped stops list
   * @param {*} params
   */
  getUnskippedStopsList = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("areaManagerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getSkippedStopListCurrentWeek]", newParams).catch((error) => {
          reject(error);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Unskipped stops List error ===>>", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getDrivers
   * Purpose: To get all driver list works under area manager
   * @param {*} params
   */
  getDrivers = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("areaManagerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_getAllDrivers]", newParams).catch((error) => {
          reject(error);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Get driver list error ===>>", e);
        reject(e);
      }
    })
  }

  /**
   * Method: reassignSkippedStop
   * Purpose: To re-assign the skipped stop to new driver
   * @param {*} params
   */
  reassignSkippedStop = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = []
        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
        newParams.push(SqlQueryBuilder.SqlParameter("updatedBatchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 100, input.updatedBatchId));
        const dbRes = await SqlQueryBuilder.Execute("[dbo].[sp_reassignSkippedStop]", newParams).catch((error) => {
          reject(error);
        });

        if (dbRes && dbRes.rowsAffected.length > 0) {
          resolve({ status: true, data: dbRes });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("Reassign skipped stop catch error ===>>", e);
        reject(e);
      }
    })
  }

  /**
   * Method: getStates
   * Purpose: get state list
   * @param {*} params
   * @returns
   */
  getStates = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getAllStates]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("getStates catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  requestBatchRoute = async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("employeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, user.nsEmployeeId))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_driver_multiple_request]`, newParams);
        if (dbRes) {
          resolve(dbRes);
        } else {
          reject("INVALID_REQUEST")
        }
      } catch (e) {
        console.log("request batch catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  /**
   * Method: getRouteByState
   * Purpose: To get route by state
   * @param {*} params
   * @returns
   */
  getRouteByState = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("stateCode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.stateCode));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getStopRoute]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("getStates catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  skipStop = async (input, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        // var expectedDeliveryDate = moment(new Date(parseInt(1644849367000.0) * 1000)).format('YYYY-MM-DD HH:mm:ss')
        // console.log("expectedDeliveryDate",expectedDeliveryDate);
        // var date = moment.unix(date).format('YYYY-MM-DD HH:mm:ss')
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderID", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId))
        newParams.push(SqlQueryBuilder.SqlParameter("skipStopReasonId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.skipStopReasonId))
        newParams.push(SqlQueryBuilder.SqlParameter("notes", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.notes == "" ? null : input.notes))
        newParams.push(SqlQueryBuilder.SqlParameter("image", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.image == "" ? null : input.image))
        newParams.push(SqlQueryBuilder.SqlParameter("expectedDeliveryDate", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Date, null, (input.expectedDeliveryDate) ? input.expectedDeliveryDate : null))
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, user))
        // console.log(">>>>>>>>>>>>>>>>>>", newParams);
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_saveSkipStop]`, newParams).catch((err) => {
          console.log("database error", err)
          reject(err)
        });
        resolve(dbRes);
      } catch (e) {
        console.log("skip stop model catch error ===>>> ", e);
        reject(e);
      }
    });
  };

  skipStopReason = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getSkipStopReason]`, newParams);
        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("skip stop model catch error ===>>> ", e);
        reject(e);
      }
    })
  }


  /**
   * Method: getOrderbyBatchId
   * Purpose: To get orders by batch id
   * @param {*} params
   * @returns
   */
  getOrderbyBatchId = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getOrderByBatchId]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("get order by batch-id catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: documentMoveToBatchId
   * Purpose: updating batch-id for a particular document number in orders table
   * @param {*} params
   * @returns
   */
  documentMoveToBatchId = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("documentNumber", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.documentNumber));
        newParams.push(SqlQueryBuilder.SqlParameter("updatedBatchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.updatedBatchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_moveBatchToRoute]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes.recordset.length > 0 && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(true);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("updating document number catch error ===>>> ", e);
        reject(e);
      }
    });
  }


  /**
   * Method: getBatchIds
   * Purpose: To get all the batch-ids
   * @param {*} params
   * @returns
   */
  getBatchIds = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getBatchIds]`, newParams);

        if (dbRes && dbRes.recordset) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("getStates catch error ===>>> ", e);
        reject(e);
      }
    });
  };


  modifyDeliveryWindow = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.customerId))
        newParams.push(SqlQueryBuilder.SqlParameter("openTime", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.openTime == '' ? null : input.openTime))
        newParams.push(SqlQueryBuilder.SqlParameter("closeTime", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.closeTime == '' ? null : input.closeTime))
        newParams.push(SqlQueryBuilder.SqlParameter("openTime1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.openTime1 == '' ? null : input.openTime1))
        newParams.push(SqlQueryBuilder.SqlParameter("closeTime1", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.closeTime1 == '' ? null : input.closeTime1))
        newParams.push(SqlQueryBuilder.SqlParameter("dayName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.dayName == '' ? null : input.dayName))
        newParams.push(SqlQueryBuilder.SqlParameter("notes", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 250, input.notes == '' ? null : input.notes))
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_modifyDeliveryWindow]`, newParams).catch((err) => {
          console.log("db catch err", err)
          reject(err);
        })
        resolve(dbRes)
      } catch (e) {
        console.log("modify delivery window model catch error ===>>> ", e);
        reject(e);
      }
    });
  };


  /**
   * Method: deleteOrder
   * Purpose: To delete an order (soft delete)
   * @param {*} body
   * @returns
   */
  deleteOrder = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.nsOrderId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_deleteOrder]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(true);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("get order by batch-id catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getRouteByStateCode
   * Purpose: To get route by state_code
   * @param {*} params
   * @returns
   */
  getRouteByStateCode = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("stateCode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.stateCode));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getRoutesByStateCode]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("get route names by stateCode catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getAllRoutes
   * Purpose: To get all routes
   * @param {*} params
   * @returns
   */
  getRouteNames = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getAllRoutes]`, newParams);

        if (dbRes && dbRes.recordset && dbRes.recordset.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("get route names by stateCode catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: rerouteOrder
   * Purpose: To re-route orders
   * @param {*} body
   * @returns
   */
  rerouteOrder = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("moveFrom", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.moveFrom));
        newParams.push(SqlQueryBuilder.SqlParameter("moveTo", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.moveTo));
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_changeRouteByBatch]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset.length > 0 && dbRes.recordset[0]['error']) {
            reject(dbRes.recordset[0]['error']);
          } else {
            resolve(true);
          }
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("re-route catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: routesStopStatus
   * Purpose: To get the status of route stop
   * @param {*} params
   * @returns
   */
  routesStopStatus = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("dateTime", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.DateTime, null, input.dateTime));

        if (input.routeId) {
          newParams.push(SqlQueryBuilder.SqlParameter("routeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.routeId));
        }

        if (input.batchId) {
          newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));
        }

        if (input.stops) {
          newParams.push(SqlQueryBuilder.SqlParameter("stops", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.stops));
        }

        if (input.status) {
          newParams.push(SqlQueryBuilder.SqlParameter("status", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Int, null, input.status));
        }

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getRoutesStatus]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordset);
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("route status catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  changeSequence = async (input, user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.batchId));
        newParams.push(SqlQueryBuilder.SqlParameter("empId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, user.nsEmployeeId));
        newParams.push(SqlQueryBuilder.SqlParameter("orders", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.orders)));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_changeRouteSequence]`, newParams).catch((err) => {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err)
          reject(err);
        })
        resolve(dbRes);
      } catch (e) {
        console.log("route status catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  stopDetails = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsOrderId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsOrderId));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_stopDetails]`, newParams);
        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve({ "orderDetails": dbRes.recordsets[0][0], "pickListItem": dbRes.recordsets[1] });
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("stop details model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getRouteDetailsAM
   * Purpose: To get the details of a route from DB
   * @param {*} params
   * @returns
   */
  getRouteDetailsAM = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.routeName));
        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getRouteDetailsAMDB]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("stop details model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getRouteDayView
   * Purpose: To get the details order sequence
   * @param {*} params
   * @returns
   */
  getRouteDayView = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getRouteDayViewDetails]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          resolve(dbRes.recordsets)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("stop details model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getRouteNameAM
   * Purpose: To get route details of area mangaer from db
   * @param {*} params
   * @returns
   */
  getRouteNameAM = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("amEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getRouteNameAM]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset[0] && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("area manager route name catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: getModifyRouteDay
   * Purpose: To get route details of area mangaer from db
   * @param {*} params
   * @returns
   */
  getModifyRouteDay = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("routeName", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, 10, input.routeName));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[getModifyRouteDayData]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordsets)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("area manager route name catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: modifyLocationAM
   * Purpose: To modify customer location
   * @param {*} params
   * @returns
   */
  modifyLocationAM = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsCustomerId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, input.nsCustomerId));

        newParams.push(SqlQueryBuilder.SqlParameter("latitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Numeric, null, input.latitude));

        newParams.push(SqlQueryBuilder.SqlParameter("longitude", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Numeric, null, input.longitude));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[updateModifyRouteDay]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("modify location model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: endRoute
   * Purpose: ending route with storing payment details
   * @param {*} params
   * @returns
   */
  endRoute = async (input, nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];
        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));

        newParams.push(SqlQueryBuilder.SqlParameter("paymentMode", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 10, input.paymentMode));

        newParams.push(SqlQueryBuilder.SqlParameter("amount", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.Numeric, null, input.amount));

        newParams.push(SqlQueryBuilder.SqlParameter("note", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 255, input.note));

        newParams.push(SqlQueryBuilder.SqlParameter("driverSignature", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, input.driverSignature));

        newParams.push(SqlQueryBuilder.SqlParameter("chequeNumbers", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.NVarChar, null, JSON.stringify(input.chequeNumbers)));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_endRouteAction]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("route end model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: batchListByBatchId
   * Purpose: batch list by batch id
   * @param {*} params
   * @returns
   */
  batchListByBatchId = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 20, input.batchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getBatchListByBatch]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("batch list by batchid model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
   * Method: auditTrailList
   * Purpose: audit trail list
   * @param {*} params
   * @returns
   */
  auditTrailList = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getAuditTrailList]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0] && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("audit trail list - model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
  * Method: updateAuditTrail
  * Purpose: update trial
  * @param {*} params
  * @returns
  */
  updateAuditTrail = async (input) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("batchId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.VarChar, 25, input.batchId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_undoAuditTrail]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(true)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("update audit trail - model catch error ===>>> ", e);
        reject(e);
      }
    });
  }

  /**
  * Method: getBatchUnderCS
  * Purpose: getBatchUnderCS
  * @param {*} params
  * @returns
  */
  getBatchUnderCS = async (nsEmployeeId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newParams = [];

        newParams.push(SqlQueryBuilder.SqlParameter("nsEmployeeId", SqlQueryBuilder.ParameterType.Input, SqlQueryBuilder.DataType.BigInt, null, nsEmployeeId));

        const dbRes = await SqlQueryBuilder.Execute(`[dbo].[sp_getBatchUnderCS]`, newParams);

        if (dbRes && dbRes.rowsAffected && dbRes.rowsAffected.length > 0) {
          if (dbRes && dbRes.recordset && dbRes.recordset[0]["error"]) {
            reject(dbRes.recordset[0]["error"]);
          }
          resolve(dbRes.recordset)
        } else {
          reject("INVALID_REQUEST");
        }
      } catch (e) {
        console.log("getting batches under cs - model catch error ===>>> ", e);
        reject(e);
      }
    });
  }
}

module.exports.RouteModel = new RouteModel();
