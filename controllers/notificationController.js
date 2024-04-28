const dbConfig = require('../database/dbConfig');
const asyncHandler = require('express-async-handler');

const addDevice = asyncHandler((req, res) => {
  const { deviceToken } = req.body;

  if (!deviceToken) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }

  // const sqlQuery = `INSERT INTO RadioNotifications (Device_Id, Device_Token) VALUES ('${deviceId.trim()}', '${deviceToken.trim()}') ON DUPLICATE KEY UPDATE Device_Token = '${deviceToken.trim()}' `;
  const sqlQuery = `INSERT IGNORE INTO RadioNotifications (Device_Token) VALUES  ('${deviceToken.trim()}') `;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.status(201).json({ message: 'Device added.' });
    }
  });
});

module.exports = {
  addDevice,
};
