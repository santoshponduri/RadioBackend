const pool = require('../database/dbConfig');
const asyncHandler = require('express-async-handler');

const getBanners = asyncHandler(async (req, res) => {
  const sqlQuery =
    'SELECT  rb.Banner_Id,rb.Banner_Image,rb.Created_At,rc.Category_Name,rsc.SubCategory_Name,rb.Banner_Type  FROM RadioBanner rb LEFT JOIN RadioCategory as rc on rb.Category_Id  = rc.Category_Id LEFT JOIN RadioSubCategory as rsc  on rb.SubCategory_Id  = rsc.SubCategory_Id  Order by rb.Created_At DESC';
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.json(queryResult[0]);
  } catch (error) {
    console.error('getBanners, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const addBanner = asyncHandler(async (req, res) => {
  // console.log("The Add banner Request", req.body);
  const { image, categoryId, subCategoryId, bannerType } = req.body;

  if (!categoryId || !image || !subCategoryId || !bannerType) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }

  const sqlQuery = `INSERT INTO RadioBanner(Banner_Image,Category_Id,SubCategory_Id,Created_At,Banner_Type)  VALUES ('${image}', '${categoryId}','${subCategoryId}', now(), '${bannerType}' )`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.status(201).json({ message: 'Banner created.' });
  } catch (error) {
    console.error('Add Banner, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const deleteBanner = asyncHandler(async (req, res) => {
  console.log('The Delete banner Request', req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error('Delete Id is mandatory');
  }

  const sqlQuery = `DELETE  FROM RadioBanner WHERE Banner_Id = ${deleteId}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.status(201).json({ message: 'Banner deleted.' });
  } catch (error) {
    console.error('Delete Banner, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const getCategories = asyncHandler(async (req, res) => {
  const sqlQuery = 'SELECT Category_Id,Category_Name FROM RadioCategory';

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.json(queryResult[0]);
  } catch (error) {
    console.error('getCategories, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const getSubCategories = asyncHandler(async (req, res) => {
  const categoryId = req.query.id;
  if (!categoryId) {
    res.status(400);
    throw new Error('Category Id is mandatory');
  }

  const sqlQuery = `SELECT  SubCategory_Id , SubCategory_Name  FROM RadioSubCategory where FK_Category_Id  = ${categoryId}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.json(queryResult[0]);
  } catch (error) {
    console.error('getSubCategories, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const getBannersByCategory = asyncHandler(async (req, res) => {
  const { categoryId, subCategoryId } = req.body;
  if (!categoryId || !subCategoryId) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }

  const sqlQuery = `SELECT  Banner_Image,Banner_Type FROM RadioBanner WHERE Category_Id = ${categoryId} AND SubCategory_Id =${subCategoryId} ORDER BY Banner_Type`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.json(queryResult[0]);
  } catch (error) {
    console.error('getSubCategories, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

module.exports = {
  getBanners,
  addBanner,
  deleteBanner,
  getCategories,
  getSubCategories,
  getBannersByCategory,
};
