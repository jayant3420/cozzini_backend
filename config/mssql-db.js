const Config = require("./config");
const Sql = require("mssql");
class MSSqlConfig {
  /**
   *
   * @returns
   */
  CreateConnection = () => {
    console.log("calling DB connection");
    //Sql.map.register(Number, Sql.BigInt);
    return new Sql.ConnectionPool({
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
    });
  };
  Request = (DbConn) => {
    return new Sql.Request(DbConn);
  };
}
Sql.on("error", (err) => {
  console.log("mssql-db.js Sql error ====>>>", err);
});
module.exports = new MSSqlConfig();
