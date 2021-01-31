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
  const { offset } = ctx.query;
  const reviews_per_page = 20;

  const paginated_reviews = await Suggest.getAllReviewsPaginated(
    reviews_per_page,
    offset
  );

  const reviews = await Suggest.getAllReviews();

  const reviews_num = reviews.length;

  const paginate = (pageSize, totalClients) => {
    return totalClients < pageSize ? 1 : Math.ceil(totalClients / pageSize);
  };

  const totalPages = paginate(reviews_per_page, reviews_num);

  const currentPage = Math.ceil(offset / reviews_per_page) + 1;

  if (!reviews && !paginated_reviews) {
    response(ctx, 404, { message: "No reviews found." });
  } else {
    response(ctx, 200, { currentPage, totalPages, paginated_reviews });
  }
};

module.exports = {
  addReview,
  getReview,
  getAllReviews,
  deleteReview,
};
