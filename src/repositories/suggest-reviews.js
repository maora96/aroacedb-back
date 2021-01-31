const database = require("../utils/database");

const addReview = async (review) => {
  const q = {
    text:
      "INSERT INTO re_suggestions (id, character_id, review_for, reviewer, ownvoice_for, link) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *",
    values: [
      review.character_id,
      review.review_for,
      review.reviewer,
      review.ownvoice_for,
      review.link,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getReview = async (id) => {
  const q = {
    text: "SELECT * FROM re_suggestions where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllReviews = async (id) => {
  const q = {
    text: "SELECT * FROM re_suggestions",
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllReviewsPaginated = async (reviews_per_page, offset) => {
  const q = {
    text: "SELECT * FROM re_suggestions limit $1 offset $2",
    values: [reviews_per_page, offset],
  };

  const query = await database.query(q);
  return query.rows;
};

const deleteReview = async (id) => {
  const q = {
    text: "DELETE FROM re_suggestions where id = $1 returning *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  getReview,
  addReview,
  getAllReviews,
  deleteReview,
  getAllReviewsPaginated,
};
