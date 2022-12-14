const connection = require('../database/connection');

exports.addMessage = async ({
  from_id, for_id, message, for_username, from_username,
}) => {
  const query = `INSERT INTO messages(from_id , for_id , message, for_username, from_username) 
  VALUES ($1 , $2 , $3, $4, $5)`;

  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [from_id, for_id, message, for_username, from_username],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
};

exports.backupMessages = async ({ from_id, for_id }) => {
  const query = `SELECT from_username,message, created_at FROM messages 
  WHERE from_id = $1 AND for_id = $2 
  ORDER BY created_at`;

  const user1 = new Promise((resolve, reject) => {
    connection.query(query, [for_id, from_id], (e, result) => {
      if (e) {
        console.log(e);
        reject(e);
      }

      if (!result.rowCount) {
        return resolve(null);
      }

      resolve(result.rows[0]);
    });
  });

  const user2 = new Promise((resolve, reject) => {
    connection.query(query, [from_id, for_id], (e, result) => {
      if (e) {
        console.log(e);
        reject(e);
      }
      if (!result.rowCount) {
        return resolve(null);
      }

      resolve(result.rows[0]);
    });
  });

  const data_user_1 = await user1;
  const data_user_2 = await user2;
  const messages = {};

  messages[from_id] = data_user_1;
  messages[for_id] = data_user_2;
  return messages;
};
