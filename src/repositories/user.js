const database = require("../utils/database");

const addUser = async (user) => {
  const q = {
    text: `INSERT INTO users 
        (id, email, password)
        VALUES (DEFAULT, $1, $2) RETURNING *`,
    values: [user.email, user.password],
  };

  const query = await database.query(q);
  return query.rows;
};

const getUserByEmail = async (email) => {
  console.log(email);
  const q = {
    text: "SELECT * from users where email = $1",
    values: [email],
  };

  const query = await database.query(q);
  console.log(query.rows[0]);
  return query.rows[0];
};

module.exports = { addUser, getUserByEmail };
