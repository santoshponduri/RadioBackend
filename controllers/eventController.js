let dbConfig = require('../database/dbConfig');
const asyncHandler = require('express-async-handler');
const { sendPushNotifications } = require('../middleware/notifications');

const getEvents = asyncHandler(async (req, res) => {
  const sqlQuery = 'SELECT * from RadioEvents';
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.json({ Message: 'Error in api ' + err });
    } else {
      sendPushNotifications('New Event Addded', 'erfw', 'Event');
      connection.destroy();
      return res.json(result);
    }
  });
});

const addEvent = asyncHandler(async (req, res) => {
  const { name, title, description, date, image, categoryId, subCategoryId } =
    req.body;

  if (
    !name ||
    !title ||
    !description ||
    !date ||
    !image ||
    !categoryId ||
    !subCategoryId
  ) {
    res.status(400);
    throw new Error('All are mandatory fields ');
  }

  const sqlQuery = `INSERT INTO RadioEvents(Event_Name,Event_Title,Event_Description,Event_Date,Created_At, Event_Image,Category_Id,SubCategory_Id)  VALUES ('${name}', '${title}','${description}','${date}', now(), '${image}', '${categoryId}', '${subCategoryId}' )`;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      sendPushNotifications('New Event Addded', title, 'Event');
      connection.destroy();
      return res.status(201).json({ message: 'Event created.' });
    }
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  console.log('The Delete event Request', req.query.id);
  const deleteId = req.query.id;

  if (!deleteId) {
    res.status(400);
    throw new Error('Delete Id is mandatory');
  }

  const sqlQuery = `DELETE  FROM RadioEvents WHERE Event_Id = ${deleteId}`;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.status(201).json({ message: 'Event deleted.' });
    }
  });
});

const editEvent = asyncHandler(async (req, res) => {
  console.log('The Update event Request', req.body);
  const {
    id,
    name,
    title,
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

  const sqlQuery = `UPDATE RadioEvents SET Event_Name = '${name}', Event_Title ='${title}', Event_Description = '${description}' , Event_Date = '${date}', Event_Image = '${image}' ,Category_Id = '${categoryId}', SubCategory_Id = '${subCategoryId}' WHERE Event_Id = '${id}'`;
  connection = dbConfig();

  connection.query(sqlQuery, (err, result) => {
    if (err) {
      connection.destroy();
      console.log(err);
      return res.status(400).json({ Message: 'Error in api' + err });
    } else {
      connection.destroy();
      return res.status(201).json({ message: 'Event updated.' });
    }
  });
});

module.exports = { getEvents, addEvent, deleteEvent, editEvent };
