const asyncHandler = require('express-async-handler');
const { sendPushNotifications } = require('../middleware/notifications');
const pool = require('../database/dbConfig');

const getEvents = asyncHandler(async (req, res) => {
  const sqlQuery =
    'SELECT Event_Id,Event_Name,Event_Title,Event_Buy_Url,Event_Description,Event_Date,Event_Image, rc.Category_Id ,rc.Category_Name,rsc.SubCategory_Id ,rsc.SubCategory_Name  FROM RadioEvents re LEFT JOIN RadioCategory as rc on re.Category_Id  = rc.Category_Id LEFT JOIN RadioSubCategory as rsc  on re.SubCategory_Id  = rsc.SubCategory_Id  Order by re.Created_At DESC';

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.json(queryResult[0]);
  } catch (error) {
    console.error('getEvents, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const addEvent = asyncHandler(async (req, res) => {
  const {
    name,
    title,
    description,
    buyUrl,
    date,
    image,
    categoryId,
    subCategoryId,
  } = req.body;

  if (
    !name ||
    !title ||
    !description ||
    !buyUrl ||
    !image ||
    !categoryId ||
    !subCategoryId
  ) {
    res.status(400);
    throw new Error('All are mandatory fields ');
  }
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(
      `INSERT INTO RadioEvents(Event_Name,Event_Title,Event_Buy_Url, Event_Description,Event_Date,Created_At, Event_Image,Category_Id,SubCategory_Id)  VALUES (?,?,?,?,?,now(),?,?,? )`,
      [name, title, buyUrl, description, date, image, categoryId, subCategoryId]
    );

    await connection.commit();
    sendPushNotifications('New Event Addded', title, 'Event');
    return res.status(201).json({ message: 'Event created.' });
  } catch (error) {
    console.error('Add Events, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  console.log('The Delete event Request', req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error('Delete Id is mandatory');
  }

  const sqlQuery = `DELETE  FROM RadioEvents WHERE Event_Id = ${deleteId}`;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    await connection.commit();
    return res.status(201).json({ message: 'Event deleted.' });
  } catch (error) {
    console.error('Delete Events, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

const editEvent = asyncHandler(async (req, res) => {
  console.log('The Update event Request', req.body);
  const {
    id,
    name,
    title,
    buyUrl,
    description,
    date,
    image,
    categoryId,
    subCategoryId,
  } = await req.body;

  if (!id || !name || !title || !description || !date || !image) {
    res.status(400);
    throw new Error('All are mandatory fields');
  }
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(
      `UPDATE RadioEvents SET Event_Name = ?, Event_Title = ? , Event_Buy_Url = ? , Event_Description = ? , Event_Date = ?, Event_Image = ? ,Category_Id = ?, SubCategory_Id = ? WHERE Event_Id = ?`,
      [
        name,
        title,
        buyUrl,
        description,
        date,
        image,
        categoryId,
        subCategoryId,
        id,
      ]
    );
    await connection.commit();
    return res.status(201).json({ message: 'Event updated.' });
  } catch (error) {
    console.error('Edit Events, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
});

module.exports = { getEvents, addEvent, deleteEvent, editEvent };
