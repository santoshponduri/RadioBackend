const mysql = require('mysql2');

const dbConfig = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'RadioZindagi',
});

// const dbConfig = mysql.createConnection({
//   host: 'rz.birbals.com',
//   user: 'rzappadminradioz_root',
//   password: 'RadioZindagi',
//   database: 'rzappadminradioz_RadioZindagi',
// });

dbConfig.connect((err) => {
  if (err) {
    console.log('Database Connection Failed !!!', err);
  } else {
    console.log('connected to Database');
  }
});

module.exports = dbConfig;
