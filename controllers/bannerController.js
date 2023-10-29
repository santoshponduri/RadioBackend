const dbConfig = require("../database/dbConfig");
const asyncHandler = require("express-async-handler");

const getBanners = asyncHandler(async (req, res) => {
  const sqlQuery =
    "SELECT  rb.Banner_Id,rb.Banner_Image,rb.Created_At,rc.Category_Name,rsc.SubCategory_Name  FROM RadioBanner rb LEFT JOIN RadioCategory as rc on rb.Category_Id  = rc.Category_Id LEFT JOIN RadioSubCategory as rsc  on rb.SubCategory_Id  = rsc.SubCategory_Id  Order by rb.Created_At DESC";
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const addBanner = asyncHandler(async (req, res) => {
  // console.log("The Add banner Request", req.body);
  const { image, categoryId, subCategoryId } = req.body;

  if (!categoryId || !image || !subCategoryId) {
    res.status(400);
    throw new Error("All are mandatory fields");
  }

  const sqlQuery = `INSERT INTO RadioBanner(Banner_Image,Category_Id,SubCategory_Id,Created_At)  VALUES ('${image}', '${categoryId}','${subCategoryId}', now())`;

  await dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Banner created." });
  });
});

const deleteBanner = asyncHandler(async (req, res) => {
  console.log("The Delete banner Request", req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error("Delete Id is mandatory");
  }

  const sqlQuery = `DELETE  FROM RadioBanner WHERE Banner_Id = ${deleteId}`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.status(400).json({ Message: "Error in api" + err });
    return res.status(201).json({ message: "Banner deleted." });
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const sqlQuery = "SELECT Category_Id,Category_Name FROM RadioCategory";
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api" });
    return res.json(result);
  });
});

const getSubCategories = asyncHandler(async (req, res) => {
  const categoryId = req.query.id;
  if (!categoryId) {
    res.status(400);
    throw new Error("Category Id is mandatory");
  }

  const sqlQuery = `SELECT  SubCategory_Id , SubCategory_Name  FROM RadioSubCategory where FK_Category_Id  = ${categoryId}`;
  dbConfig.query(sqlQuery, (err, result) => {
    if (err) return res.json({ Message: "Error in api subcategory" });
    return res.json(result);
  });
});

module.exports = {
  getBanners,
  addBanner,
  deleteBanner,
  getCategories,
  getSubCategories,
};
