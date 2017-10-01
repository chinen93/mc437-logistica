const mysql = require('mysql');
const credentials = require('./mariaDBCredentials.json');

exports.execSQLQuery = function (sqlQry, resCallback) {
  const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || credentials.host,
    port: process.env.RDS_PORT || credentials.port,
    user: process.env.RDS_USERNAME || credentials.user,
    password: process.env.RDS_PASSWORD || credentials.password,
    database: process.env.RDS_DB_NAME || credentials.database
  });

  connection.query(sqlQry, (error, results) => {
    resCallback(error, results);

    connection.end();

    console.log(error);
    console.log(results);
  });
};
