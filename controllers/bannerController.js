const dbConfig = require('../database/dbConfig');
const asyncHandler = require('express-async-handler');

const getBanners = asyncHandler(async (req, res) => {
  const sqlQuery =
    'SELECT  rb.Banner_Id,rb.Banner_Image,rb.Created_At,rc.Category_Name,rsc.SubCategory_Name,rb.Banner_Type  FROM RadioBanner rb LEFT JOIN RadioCategory as rc on rb.Category_Id  = rc.Category_Id LEFT JOIN RadioSubCategory as rsc  on rb.SubCategory_Id  = rsc.SubCategory_Id  Order by rb.Created_At DESC';
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.json({ Message: 'Error in api ' + err });
    } else {
      connection.destroy();
      return res.json(result);
    }
  });
});

const addBanner = asyncHandler(async (req, res) => {
  // console.log("The Add banner Request", req.body);
  const { image, categoryId, subCategoryId, bannerType } = req.body;

  if (!categoryId || !image || !subCategoryId || !bannerType) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }

  const sqlQuery = `INSERT INTO RadioBanner(Banner_Image,Category_Id,SubCategory_Id,Created_At,Banner_Type)  VALUES ('${image}', '${categoryId}','${subCategoryId}', now(), '${bannerType}' )`;
  connection = dbConfig();

  await connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.status(201).json({ message: 'Banner created.' });
    }
  });
});

const deleteBanner = asyncHandler(async (req, res) => {
  console.log('The Delete banner Request', req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error('Delete Id is mandatory');
  }

  const sqlQuery = `DELETE  FROM RadioBanner WHERE Banner_Id = ${deleteId}`;
  connection = dbConfig();
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.status(201).json({ message: 'Banner deleted.' });
    }
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const sqlQuery = 'SELECT Category_Id,Category_Name FROM RadioCategory';
  connection = dbConfig();
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.json(result);
    }
  });
});

const getSubCategories = asyncHandler(async (req, res) => {
  const categoryId = req.query.id;
  if (!categoryId) {
    res.status(400);
    throw new Error('Category Id is mandatory');
  }

  const sqlQuery = `SELECT  SubCategory_Id , SubCategory_Name  FROM RadioSubCategory where FK_Category_Id  = ${categoryId}`;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.json({ Message: 'Error in api subcategory' + err });
    } else {
      connection.destroy();
      return res.json(result);
    }
  });
});

const getBannersByCategory = asyncHandler(async (req, res) => {
  const { categoryId, subCategoryId } = req.body;
  if (!categoryId || !subCategoryId) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }
  const sqlQuery = `SELECT  Banner_Image,Banner_Type FROM RadioBanner WHERE Category_Id = ${categoryId} AND SubCategory_Id =${subCategoryId} ORDER BY Banner_Type`;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.json(result);
    }
  });
});

module.exports = {
  getBanners,
  addBanner,
  deleteBanner,
  getCategories,
  getSubCategories,
  getBannersByCategory,
};
