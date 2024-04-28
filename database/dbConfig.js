module.exports = () => {
  let mysql = require('mysql2');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'RadioZindagi',
  });

  // let connection = mysql.createConnection({
  //   host: '45.79.108.148',
  //   user: 'rzappadminradioz_root',
  //   password: 'RadioZindagi',
  //   database: 'rzappadminradioz_RadioZindagi',
  // });

  connection.connect(function (err) {
    if (err) {
      console.log(`connectionRequest Failed ${err.stack}`);
    } else {
      console.log(`DB connectionRequest Successful ${connection.threadId}`);
    }
  });

  return connection;
};
