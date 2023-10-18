const dbConfig = require("../database/dbConfig");
const asyncHandler = require("express-async-handler");

const getEvents = asyncHandler(async (req, res) => {
  const sqlQuery = "SELECT * from RadioEvents ";
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const addEvent = asyncHandler(async (req, res) => {
  console.log("The Add event Request", req.body);
  const { name, title, description, date } = await req.body;

  if (!name || !title || !description || !date) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `INSERT INTO RadioEvents(Event_Name,Event_Title,Event_Description,Event_Date)  VALUES ('${name}', '${title}','${description}','${date}')`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Event created." });
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  console.log("The Delete event Request", req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error("Delete Id is mandatory");
  }

  const sqlQuery = `DELETE  FROM RadioEvents WHERE Event_Id = ${deleteId}`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Event deleted." });
  });
});

const editEvent = asyncHandler(async (req, res) => {
  console.log("The Update event Request", req.body);
  const { id, name, title, description, date } = await req.body;

  if (!id || !name || !title || !description || !date) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `UPDATE RadioEvents SET Event_Name = '${name}', Event_Title ='${title}', Event_Description = '${description}' , Event_Date = '${date}' WHERE Event_Id = '${id}'`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Event updated." });
  });
});

module.exports = { getEvents, addEvent, deleteEvent, editEvent };
