const pool = require('../database/dbConfig');
const asyncHandler = require('express-async-handler');

const addDevice = asyncHandler(async (req, res) => {
  const { deviceToken } = req.body;

  if (!deviceToken) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }

  // const sqlQuery = `INSERT INTO RadioNotifications (Device_Id, Device_Token) VALUES ('${deviceId.trim()}', '${deviceToken.trim()}') ON DUPLICATE KEY UPDATE Device_Token = '${deviceToken.trim()}' `;
  const sqlQuery = `INSERT IGNORE INTO RadioNotifications (Device_Token) VALUES  ('${deviceToken.trim()}') `;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.status(201).json({ message: 'Device added.' });
  } catch (error) {
    console.error('addDevice, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

module.exports = {
  addDevice,
};
