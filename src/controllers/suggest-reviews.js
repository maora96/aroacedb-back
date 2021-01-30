const Suggest = require("../repositories/suggest-reviews");
const response = require("./response");

const addReview = async (ctx) => {
  const {
    character_id = null,
    review_for = null,
    reviewer = null,
    ownvoice_for = null,
    link = null,
  } = ctx.request.body;

  if (!character_id && !review_for && !reviewer && !ownvoice_for && !link) {
    response(ctx, 404, { message: "It's not possible to add an empty review" });
  }

  const review = {
    character_id,
    review_for,
    reviewer,
    ownvoice_for,
    link,
  };

  const dbReview = await Suggest.addReview(review);

  response(ctx, 201, { review });
};

const getReview = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const review = await Suggest.getReview(id);
    response(ctx, 201, { review });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const deleteReview = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const review = await Suggest.deleteReview(id);
    response(ctx, 201, { review });
  }
};

const getAllReviews = async (ctx) => {
  const reviews = await Suggest.getAllReviews();

  if (!reviews) {
    response(ctx, 404, { message: "No characters found." });
  } else {
    response(ctx, 200, { reviews });
  }
};

module.exports = {
  addReview,
  getReview,
  getAllReviews,
  deleteReview,
};
