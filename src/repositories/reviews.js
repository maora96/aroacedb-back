const database = require("../utils/database");

const addReview = async (review) => {
  const q = {
    text:
      "INSERT INTO reviews (id, character_id, review_for, reviewer, ownvoices_for, link) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *",
    values: [
      review.character_id,
      review.review_for,
      review.reviewer,
      review.ownvoices_for,
      review.link,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getReview = async (id) => {
  const q = {
    text: "SELECT * FROM reviews where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllReviews = async (id) => {
  const q = {
    text: "SELECT * FROM reviews where character_id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const updateReview = async (
  id,
  character_id,
  review_for,
  reviewer,
  ownvoices_for,
  link
) => {
  const q = {
    text:
      "UPDATE reviews set character_id = $1, review_for = $2, reviewer = $3, ownvoices_for = $4, link = $5 WHERE id = $6 returning *",
    values: [character_id, review_for, reviewer, ownvoices_for, link, id],
  };
  const query = await database.query(q);
  return query.rows.shift();
};

module.exports = { addReview, getReview, getAllReviews, updateReview };
