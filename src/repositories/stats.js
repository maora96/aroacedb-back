const database = require("../utils/database");

const getCharacterCount = async () => {
  const q = {
    text: "SELECT count(*) FROM characters",
  };
  const query = await database.query(q);
  return query.rows;
};

const getReviewsCount = async () => {
  const q = {
    text: "SELECT count(*) FROM reviews",
  };
  const query = await database.query(q);
  return query.rows;
};

const getStoriesCount = async () => {
  const q = {
    text: "select count(distinct story_title) from stories ",
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  getCharacterCount,
  getReviewsCount,
  getStoriesCount,
};
