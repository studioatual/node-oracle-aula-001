var oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

function queryString(query, params = {}) {
  var connection;
  oracledb
    .getConnection({
      user: "system",
      password: "oracle",
      connectString: "localhost/XE"
    })
    .then(function(conn) {
      console.log("connection is openned.");
      connection = conn;
      return connection.execute(query, params);
    })
    .then(function(response) {
      console.log(response.rows);
    })
    .catch(function(err) {
      console.log(err);
    })
    .finally(function() {
      if (connection) {
        connection.close();
        console.log("connection is closed.");
      }
    });
}

queryString("SELECT * FROM HR.EMPLOYEES WHERE EMPLOYEE_ID = :id", { id: 105 });
