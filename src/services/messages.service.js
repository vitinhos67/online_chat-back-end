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
  const query = `SELECT username,message,
  id_message,
  from_username,
  for_username,
  from_id,
  for_id 
  FROM messages INNER JOIN users ON messages.from_id = users.id 
  WHERE (messages.from_id = $1
  AND messages.for_id = $2) OR (messages.from_id = $2 AND
  messages.for_id = $1) ORDER BY messages.created_at`;

  return new Promise((resolve, reject) => {
    connection.query(query, [from_id, for_id], (e, result) => {
      if (e) {
        reject(e);
      }

      if (!result.rowCount) {
        return resolve(null);
      }

      resolve(result.rows);
    });
  });
};
