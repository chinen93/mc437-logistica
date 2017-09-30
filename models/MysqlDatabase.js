const mysql = require("mysql");

exports.execSQLQuery = function(sqlQry, resCallback){
  var credentials = require('./mariaDBCredentials.json');

  const connection = mysql.createConnection(credentials);

  connection.query(sqlQry, function(error, results, fields){
      resCallback(error, results);

      connection.end();

      console.log(error);
      console.log(results);

  });
}
