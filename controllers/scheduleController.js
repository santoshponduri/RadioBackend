const dbConfig = require("../database/dbConfig");
const asyncHandler = require("express-async-handler");

const getSchedules = asyncHandler(async (req, res) => {
  const sqlQuery = "SELECT * from RadioSchedule ";
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const addSchedule = asyncHandler(async (req, res) => {
  console.log("The Add Schedule Request", req.body);
  const { name, description, date } = await req.body;

  if (!name || !description || !date) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `INSERT INTO RadioSchedule(Schedule_Name, Schedule_Description, Schedule_Date)  VALUES ('${name}', '${description}','${date}')`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Schedule created." });
  });
});

module.exports = { getSchedules, addSchedule };
