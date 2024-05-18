const pool = require('../database/dbConfig');
var FCM = require('fcm-node');

module.exports.sendPushNotifications = async (title, messageData, type) => {
  var serverKey =
    'AAAAAHj1Ceg:APA91bFWQu4Ohiu_-HjToXDGIjGFyvWtAyu6ujit3ahlyjHyn51dhwxuWO1pPX7Hg4L58Oc1x4TIAl6ErAKh5qy4ThqmiLCjlCPrlA7v-JG2vxhJJWWZt1_znmHCGXxdHsY6G9WUL-0Y';
  var fcm = new FCM(serverKey);
  const sqlQuery = 'Select Device_Token from RadioNotifications';
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const queryResult = await connection.query(sqlQuery);
    const result = queryResult[0];
    await connection.commit();

    let returnedIds = [];
    Object.keys(result).forEach((key) => {
      returnedIds.push(result[key].Device_Token);
    });
    console.log('finalValues===' + returnedIds.length);
    var message = {
      registration_ids: returnedIds,
      collapse_key: message,

      notification: {
        title: title,
        body: messageData,
        sound: 'default',
        priority: 'high',
        action: type,
      },

      data: {
        my_key: title,
        my_another_key: messageData,
        action: type,
      },
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log('Something has gone wrong!', err);
      } else {
        console.log('Successfully sent with response: ', response);
      }
    });
  } catch (error) {
    console.error('sendPushNotifications, an error occurred:', error);
    return res.status(400).json({ Message: 'Error in api' + error });
  } finally {
    connection.release();
  }
};
