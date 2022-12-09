const connection = require('../database/connection');

exports.addMessage = async ({ from_id, for_id, message }) => {
  const query = 'INSERT INTO messages( from_id,for_id,message) VALUES ($1,$2, $3)';

  return new Promise((resolve, reject) => {
    connection.query(query, [from_id, for_id, message], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
