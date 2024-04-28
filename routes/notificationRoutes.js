const express = require('express');
const { addDevice } = require('../controllers/notificationController');

const notificationRouter = express.Router();

notificationRouter.post('/add-device', addDevice);
module.exports = notificationRouter;
