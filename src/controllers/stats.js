const Stats = require("../repositories/stats");
const response = require("../controllers/response");

const getStats = async (ctx) => {
  const character_count = await Stats.getCharacterCount();
  const review_count = await Stats.getReviewsCount();
  const story_count = await Stats.getStoriesCount();

  response(ctx, 201, {
    character_count,
    review_count,
    story_count,
  });
};

module.exports = {
  getStats,
};
