const mysql = require('mysql');
const credentials = require('./mariaDBCredentials.json');

exports.execSQLQuery = function (sqlQry, resCallback) {
  const connection = mysql.createConnection(credentials);

  connection.query(sqlQry, (error, results) => {
    resCallback(error, results);

    connection.end();

    console.log(error);
    console.log(results);
  });
};
