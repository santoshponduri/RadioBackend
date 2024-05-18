const mysql = require('mysql2');

const mySqlPool = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'RadioZindagi',
    connectionLimit: 10,
    waitForConnections: true,
  })
  .promise();

mySqlPool.on('connection', function (connection) {
  console.log('DB Connection established');

  mySqlPool.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  mySqlPool.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

module.exports = mySqlPool;
