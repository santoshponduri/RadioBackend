const express = require("express");
const {
  getSchedules,
  addSchedule,
  editSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const eventRouter = express.Router();

eventRouter.get("/get-schedules", getSchedules);
eventRouter.post("/add-schedule", addSchedule);
eventRouter.put("/edit-schedule", editSchedule);
eventRouter.delete("/delete-schedule", deleteSchedule);

module.exports = eventRouter;
