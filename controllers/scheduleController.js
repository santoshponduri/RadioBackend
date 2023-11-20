const dbConfig = require("../database/dbConfig");
const asyncHandler = require("express-async-handler");

const getSchedules = asyncHandler(async (req, res) => {
  const sqlQuery =
    "SELECT Schedule_Id , Schedule_Name , Schedule_Description ,Schedule_Date ,Schedule_Image, rc.Category_Id ,rc.Category_Name,rsc.SubCategory_Id ,rsc.SubCategory_Name  FROM RadioSchedule rs LEFT JOIN RadioCategory as rc on rs.Category_Id  = rc.Category_Id LEFT JOIN RadioSubCategory as rsc  on rs.SubCategory_Id  = rsc.SubCategory_Id Order by rs.Created_At DESC";
  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const addSchedule = asyncHandler(async (req, res) => {
  console.log("The Add Schedule Request", req.body);
  const { name, description, date, image, categoryId, subCategoryId } =
    req.body;

  if (
    !name ||
    !description ||
    !date ||
    !image ||
    !categoryId ||
    !subCategoryId
  ) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `INSERT INTO RadioSchedule(Schedule_Name, Schedule_Description, Schedule_Date,Created_At,Schedule_Image,Category_Id,SubCategory_Id)  VALUES ('${name}', '${description}','${date}',now(), '${image}', '${categoryId}', '${subCategoryId}')`;
  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Schedule created." });
  });
});

const editSchedule = asyncHandler(async (req, res) => {
  console.log("The Update schedule Request", req.body);
  const { id, name, description, date, image, categoryId, subCategoryId } =
    req.body;

  if (!id || !name || !description || !date || !image) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `UPDATE RadioSchedule SET Schedule_Name = '${name}', Schedule_Description = '${description}' , Schedule_Date = '${date}', Schedule_Image = '${image}',Category_Id = '${categoryId}', SubCategory_Id = '${subCategoryId}' WHERE Schedule_Id = '${id}'`;
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
