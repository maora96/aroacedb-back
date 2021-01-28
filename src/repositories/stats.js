const database = require("../utils/database");

const getCharacterCount = async () => {
  const q = {
    text: "",
  };
  const query = await database.query(q);
  return query.rows;
};

const getReviewsCount = async () => {
  const q = {
    text: "",
  };
  const query = await database.query(q);
  return query.rows;
};

const getStoriesCount = async () => {
  const q = {
    text: "",
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  getCharacterCount,
  getReviewsCount,
  getStoriesCount,
};
