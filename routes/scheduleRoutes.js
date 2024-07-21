const express = require('express');
const {
  getSchedules,
  addSchedule,
  editSchedule,
  deleteSchedule,
  getSchedulesByCategory,
} = require('../controllers/scheduleController');

const eventRouter = express.Router();

eventRouter.get('/get-schedules', getSchedules);
eventRouter.post('/get-schedules_by_cat', getSchedulesByCategory);
eventRouter.post('/add-schedule', addSchedule);
eventRouter.put('/edit-schedule', editSchedule);
eventRouter.delete('/delete-schedule', deleteSchedule);

module.exports = eventRouter;
