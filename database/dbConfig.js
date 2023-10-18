const mysql = require('mysql');

const dbConfig = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "RadioZindagi"
})

dbConfig.connect((err) => { 
    if (err) { 
      console.log("Database Connection Failed !!!", err); 
    } else { 
      console.log("connected to Database"); 
    } 
}); 

module.exports = dbConfig;