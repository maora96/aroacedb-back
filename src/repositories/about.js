const database = require("../utils/database");

const updateAboutDatabase = async (about) => {
  const q = {
    text:
      "update about set the_database = $1, database_structure = $2 returning *",
    values: [about.the_database, about.database_structure],
  };

  const query = await database.query(q);
  return query.rows.shift();
};

const getAboutDatabase = async () => {
  const q = {
    text: "select the_database, database_structure from about",
  };
  const query = await database.query(q);
  console.log(query.rows[0]);
  return query.rows[0];
};

const updateAboutTeam = async (about) => {
  const q = {
    text:
      "update about set the_creator = $1, gremlins = $2, dev = $3 returning *",
    values: [about.the_creator, about.gremlins, about.dev],
  };

  const query = await database.query(q);
  return query.rows.shift();
};

const getAboutTeam = async () => {
  const q = {
    text: "select the_creator, gremlins, dev from about",
  };
  const query = await database.query(q);
  return query.rows.shift();
};

module.exports = {
  updateAboutTeam,
  updateAboutDatabase,
  getAboutDatabase,
  getAboutTeam,
};
