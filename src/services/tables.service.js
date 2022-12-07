exports.create = async (client) => {
  const query = [
    `CREATE TABLE IF NOT EXISTS users (
            id SERIAL,
            username VARCHAR(80) NOT NULL,
            email VARCHAR(80) NOT NULL,
            password VARCHAR(200) NOT NULL,
            created_at TIMESTAMP,
            PRIMARY KEY(id)
            );`,
    `CREATE TABLE IF NOT EXISTS messages (
            id_message SERIAL NOT NULL PRIMARY KEY,
            from_id INT NOT NULL,
            for_id INT NOT NULL,
            message text NOT NULL,
            created_at TIMESTAMP,
            
            FOREIGN KEY (from_id) REFERENCES users(id),
            FOREIGN KEY (for_id) REFERENCES users(id)
            );`,
  ];
  await client.query(query[0], (err) => {
    if (err) {
      console.log(err);
    }
  });

  await client.query(query[1], (err) => {
    if (err) {
      console.log(err);
    }
  });
};
