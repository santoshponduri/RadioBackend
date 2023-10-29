const mysql = require("mysql2");

const dbConfig = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "RadioZindagi",
});

// const dbConfig = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_radiouser",
//   password: "js!mNKH9xSAsgE@",
//   database: "freedb_radiozindagi",
// });

dbConfig.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

module.exports = dbConfig;
