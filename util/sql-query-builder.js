const path = require("path");
const Sql = require("mssql");
const MsSqlConfig = require("../config/mssql-db");
const Config = require("../config/config");
// const MsSqlConfig = new _MsSqlConfig();

class SqlQueryBuilder {
  ParameterType = {
    Input: "input",
    Output: "output",
  };
  DataType = {
    VarChar: "VarChar",
    NVarChar: "NVarChar",
    Text: "Text",
    Int: "Int",
    BigInt: "BigInt",
    TinyInt: "TinyInt",
    SmallInt: "SmallInt",
    Bit: "Bit",
    Float: "Float",
    Numeric: "Numeric",
    Decimal: "Decimal",
    Decimal(precision, scale) {
      return { type: "Decimal", precision, scale };
    },
    Real: "Real",
    Date: "Date",
    DateTime: "DateTime",
    DateTime2: "DateTime2",
    DateTimeOffset: "DateTimeOffset",
    SmallDateTime: "SmallDateTime",
    Time: "Time",
    UniqueIdentifier: "UniqueIdentifier",
    SmallMoney: "SmallMoney",
    Money: "Money",
    Binary: "Binary",
    VarBinary: "VarBinary",
    Image: "Image",
    Xml: "Xml",
    Char: "Char",
    NChar: "NChar",
    NText: "NText",
    TVP: "TVP",
    UDT: "UDT",
    Geography: "Geography",
    Geometry: "Geometry",
    Variant: "Variant",
  };

  NewConnectionPool = () => {
    return MsSqlConfig.CreateConnection();
  };

  CreatePoolPromise = (cb) => {
    new Sql.ConnectionPool({
      user: Config.DB_CONFIG.USER,
      password: Config.DB_CONFIG.PASSWORD,
      server: Config.DB_CONFIG.HOST, // You can use 'localhost\\instance' to connect to named instance
      database: Config.DB_CONFIG.DATABASE,
      connectionTimeout: parseInt(Config.DB_CONFIG.CONNECTION_TIMEOUT),
      requestTimeout: parseInt(Config.DB_CONFIG.REQUEST_TIMEOUT),
      pool: {
        max: parseInt(Config.DB_CONFIG.POOL_MAX),
        min: parseInt(Config.DB_CONFIG.POOL_MIN),
        idleTimeoutMillis: parseInt(Config.DB_CONFIG.IDLE_TIMEOUT_MILLIS),
      },
      options: {
        // encrypt: Config.DB_CONFIG.OPTION_ENCRYPT
        encrypt: true, // Use this if you're on Windows Azure OR  for azure
      },
    })
      .connect()
      .then((pool) => {
        //console.log('Connected to MSSQL');
        cb(null, pool);
      })
      .catch((err) => {
        cb(err, null);
        console.log("Database Connection Failed! Bad Config: ", err);
      });
  };

  createSqlPoolConnection = () => {
    return new Promise((resolve, reject) => {
      try {
        this.CreatePoolPromise((err, pool) => {
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

  SqlParameter = (parameterKey, parameterType, dataType, size, value) => {
    try {
      if (!parameterKey) {
        throw new Error("parameterKey required");
      } else if (!parameterType) {
        throw new Error("parameterType required");
      } else if (!dataType) {
        throw new Error("dataType required");
      } else
        return Object.assign(
          {},
          {
            parameterKey: parameterKey,
            parameterType: parameterType ? parameterType : "input",
            dataType: dataType ? dataType : null,
            size: size ? size : null,
            value: value,
          },
        );
    } catch (e) {
      throw e;
    }
  };

  Execute = (queryText, parameters, childProcessCon) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!global.SqlGlobalCon) {
          await this.createSqlPoolConnection().catch((err) => {
            console.log("==>>", err);
          });
        }

        let request = new Sql.Request(
          childProcessCon ? childProcessCon : global.SqlGlobalCon,
        );
        if (parameters && parameters.length > 0) {
          for (var i = 0; i < parameters.length; i++) {
            if (parameters[i] && parameters[i].dataType) {
              if (
                parameters[i].dataType.type &&
                parameters[i].dataType.type == "Decimal"
              ) {
                request[parameters[i].parameterType](
                  parameters[i].parameterKey,
                  parameters[i].dataType
                    ? parameters[i].size
                      ? Sql.Decimal(
                          parameters[i].dataType.precision,
                          parameters[i].dataType.scale,
                        )
                      : Sql.Decimal(
                          parameters[i].dataType.precision,
                          parameters[i].dataType.scale,
                        )
                    : "",
                  parameters[i].value,
                );
              } else {
                request[parameters[i].parameterType](
                  parameters[i].parameterKey,
                  parameters[i].dataType
                    ? parameters[i].size
                      ? Sql[parameters[i].dataType](parameters[i].size)
                      : Sql[parameters[i].dataType]
                    : "",
                  parameters[i].value,
                );
              }
            }
          }
          request["execute"](queryText)
            .then((recordSet) => {
              resolve(recordSet);
            })
            .catch((err) => {
              if (err.code === "ETIMEOUT") {
                request.canceled = true;
              }
              reject(err);
            });
        } else if (!parameters || (parameters && parameters.length == 0)) {
          request["execute"](queryText)
            .then((recordSet) => {
              resolve(recordSet);
            })
            .catch((err) => {
              if (err.code === "ETIMEOUT") {
                request.canceled = true;
              }
              reject(err);
            });
        } else {
          reject("Invalid request");
        }
      } catch (e) {
        reject(e.stack.toString());
      }
    });
  };
}
Sql.on("error", (err) => {
  console.log("Sql query builder error ====>>>", err);
});

module.exports = new SqlQueryBuilder();
