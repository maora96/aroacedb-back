const database = require("../utils/database");

const getPermissions = async () => {
  const q = {
    text: "select * from permissions",
  };
  const query = await database.query(q);
  console.log(query.rows);
  return query.rows;
};

const updateCharacter = async (checked) => {
  const q = {
    text:
      "update permissions set checked = $1 where checked_name = 'character' returning *",
    values: [checked],
  };

  const query = await database.query(q);
  return query.rows;
};

const updateStory = async (checked) => {
  const q = {
    text:
      "update permissions set checked = $1 where checked_name = 'story' returning *",
    values: [checked],
  };

  const query = await database.query(q);
  return query.rows;
};

const updateReview = async (checked) => {
  const q = {
    text:
      "update permissions set checked = $1 where checked_name = 'review' returning *",
    values: [checked],
  };

  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  getPermissions,
  updateCharacter,
  updateReview,
  updateStory,
};
