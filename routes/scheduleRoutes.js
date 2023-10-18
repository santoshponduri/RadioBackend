const express = require("express");
const {
  getSchedules,
  addSchedule,
} = require("../controllers/scheduleController");

const eventRouter = express.Router();

eventRouter.get("/get-schedules", getSchedules);
eventRouter.post("/add-schedule", addSchedule);

module.exports = eventRouter;
