const Stats = require("../repositories/stats");
const response = require("../controllers/response");

const getStats = async (ctx) => {
  const character_count = await Stats.getCharacterCount();
  const review_count = await Stats.getReviewsCount();
  const story_count = await Stats.getStoriesCount();
  console.log(character_count[0].count);
  response(ctx, 201, {
    characterCount: character_count[0].count,
    reviewCount: review_count[0].count,
    storyCount: story_count[0].count,
  });
};

module.exports = {
  getStats,
};
