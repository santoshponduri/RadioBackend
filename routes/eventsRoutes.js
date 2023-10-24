const express = require("express");
const {
  getEvents,
  addEvent,
  deleteEvent,
  editEvent,
} = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.post("/add-event", addEvent);
eventRouter.get("/get-events", getEvents);
eventRouter.delete("/delete-event", deleteEvent);
eventRouter.put("/edit-event", editEvent);

module.exports = eventRouter;
