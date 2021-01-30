const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const Characters = require("./controllers/characters");
const Stories = require("./controllers/stories");
const Reviews = require("./controllers/reviews");
const SuggestCharacters = require("./controllers/suggest-characters");
const SuggestStories = require("./controllers/suggest-stories");
const SuggestReviews = require("./controllers/suggest-reviews");
const Stats = require("./controllers/stats");

const Password = require("./middlewares/encrypt");
const Session = require("./middlewares/session");

// auth

router.post("/auth", Auth.authenticate);

// characters

router.post("/characters", Characters.addCharacter);
router.put("/characters/:id", Characters.updateCharacter);
router.get("/characters/:id", Characters.getCharacter);
router.get("/characters", Characters.getAllCharacters);
router.get("/character", Characters.getRandomCharacter);
router.delete("/characters/:id", Characters.deleteCharacter);

// stories

router.get("/stories/:id", Stories.getStory);
router.get("/stories/character/:id", Stories.getAllStoriesByCharacter);
router.put("/stories/:id", Stories.updateStory);
router.post("/stories", Stories.addStory);
router.delete("/stories/:id", Stories.deleteStory);

// reviews

router.get("/reviews/character/:id", Reviews.getAllReviewsByCharacter);
router.put("/reviews/:id", Reviews.updateReview);
router.get("/reviews/:id", Reviews.getReview);
router.post("/reviews", Reviews.addReview);
router.delete("/reviews/:id", Reviews.deleteReview);

// suggest characters

router.post("/suggest/characters", SuggestCharacters.addCharacter);
router.get("/suggest/characters/recent", SuggestCharacters.getRecentSuggested);
router.get("/suggest/characters/:id", SuggestCharacters.getCharacter);
router.get("/suggest/characters", SuggestCharacters.getAllCharacters);
router.delete("/suggest/characters/:id", SuggestCharacters.deleteCharacter);

// suggest stories

router.post("/suggest/stories", SuggestStories.addStory);
router.get("/suggest/stories/:id", SuggestStories.getStory);
router.get("/suggest/stories", SuggestStories.getAllStories);
router.delete("/suggest/stories/:id", SuggestStories.deleteStory);

// suggest reviews

router.post("/suggest/reviews", SuggestReviews.addReview);
router.get("/suggest/reviews/:id", SuggestReviews.getReview);
router.get("/suggest/reviews", SuggestReviews.getAllReviews);
router.delete("/suggest/reviews/:id", SuggestReviews.deleteReview);

// stats
router.get("/stats", Stats.getStats);

module.exports = router;
