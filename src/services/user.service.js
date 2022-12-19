const connection = require('../database/connection');

exports.store = ({ username, email, password }) => {
  const query = `
  INSERT INTO users (
    username,
    password,
    email
    ) VALUES (
        $1,$2,$3
    )`;

  return new Promise((resolve, reject) => {
    connection.query(query, [username, password, email], (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
};

exports.findUser = async (email) => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.rowCount === 0) {
        resolve('user_not_find');
      }
      resolve(result.rows);
    });
  });
};

exports.findUserByIdDB = async (id) => {
  const query = `SELECT * FROM users WHERE id = '${id}'`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result.rows[0]);
    });
  });
};

exports.addDescriptionInProfile = async ({ id, description }) => {
  const query = `UPDATE users SET description = '${description}' where id = ${id};`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};
