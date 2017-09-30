const mysql = require("mysql");

exports.execSQLQuery = function(sqlQry, resCallback){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'mamute1802!',
    database : 'Logistica'
  });

  connection.query(sqlQry, function(error, results, fields){
      resCallback(error, results);

      connection.end();

      console.log(error);
      console.log(results);

  });
}
