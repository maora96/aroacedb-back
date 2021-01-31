const reviews = require("../repositories/reviews");
const response = require("../controllers/response");

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

  const dbReview = await reviews.addReview(review);

  response(ctx, 201, { review });
};

const getReview = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const review = await reviews.getReview(id);
    response(ctx, 201, { review: review });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const deleteReview = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const review = await reviews.deleteReview(id);
    response(ctx, 201, { review });
  }
};

const deleteAllCharacterReviews = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const reviews = await reviews.deleteAllCharacterReviews(id);
    response(ctx, 201, { reviews });
  }
};

const getAllReviewsByCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const characterReviews = await reviews.getAllReviews(id);

    response(ctx, 201, { reviews: characterReviews });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const updateReview = async (ctx) => {
  const {
    character_id,
    review_for,
    reviewer,
    ownvoice_for,
    link,
  } = ctx.request.body;

  const { id = null } = ctx.params;

  if (id) {
    const review = await reviews.getReview(id);
    if (review) {
      const update = await reviews.updateReview(
        id,
        character_id,
        review_for,
        reviewer,
        ownvoice_for,
        link
      );
      response(ctx, 200, update);
    } else {
      response(ctx, 404, { message: "Review not found." });
    }
  } else {
    response(ctx, 404, { message: "ID needed." });
  }
};

module.exports = {
  addReview,
  getReview,
  getAllReviewsByCharacter,
  updateReview,
  deleteReview,
  deleteAllCharacterReviews,
};
