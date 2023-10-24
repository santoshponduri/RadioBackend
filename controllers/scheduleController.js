const dbConfig = require("../database/dbConfig");
const asyncHandler = require("express-async-handler");

const getSchedules = asyncHandler(async (req, res) => {
  const sqlQuery = "SELECT * from RadioSchedule Order by Created_At DESC";
  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const addSchedule = asyncHandler(async (req, res) => {
  console.log("The Add Schedule Request", req.body);
  const { name, description, date, image } = req.body;

  if (!name || !description || !date || !image) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `INSERT INTO RadioSchedule(Schedule_Name, Schedule_Description, Schedule_Date,Created_At,Schedule_Image)  VALUES ('${name}', '${description}','${date}',now(), '${image}')`;
  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Schedule created." });
  });
});

const editSchedule = asyncHandler(async (req, res) => {
  console.log("The Update schedule Request", req.body);
  const { id, name, description, date, image } = req.body;

  if (!id || !name || !description || !date || !image) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `UPDATE RadioSchedule SET Schedule_Name = '${name}', Schedule_Description = '${description}' , Schedule_Date = '${date}', Schedule_Image = '${image}' WHERE Schedule_Id = '${id}'`;
  await dbConfig.query(sqlQuery, (err, result) => {
    console.log("result==>" + result + "==>" + err);
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Schedule updated." });
  });
});

const deleteSchedule = asyncHandler(async (req, res) => {
  console.log("The Delete Schedule Request", req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error("Delete Id is mandatory");
  }

  const sqlQuery = `DELETE  FROM RadioSchedule WHERE Schedule_Id = ${deleteId}`;
  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Event deleted." });
  });
});

module.exports = { getSchedules, addSchedule, editSchedule, deleteSchedule };
