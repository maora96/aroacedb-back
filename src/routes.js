const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const Characters = require("./controllers/characters");
const Stories = require("./controllers/stories");
const Reviews = require("./controllers/reviews");
const Suggest = require("./controllers/suggest");
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

router.get("/stories/character/:id", Stories.getAllStoriesByCharacter);
router.put("/stories/:id", Stories.updateStory);
router.post("/stories", Stories.addStory);

// reviews

router.get("/reviews/character/:id", Reviews.getAllReviewsByCharacter);
router.put("/reviews/:id", Reviews.updateReview);
router.post("/reviews", Reviews.addReview);

// suggest

router.post("/suggest", Suggest.addCharacter);
router.get("/suggest/recent", Suggest.getRecentSuggested);
router.get("/suggest/:id", Suggest.getCharacter);
router.get("/suggest", Suggest.getAllCharacters);
router.delete("/suggest/:id", Suggest.deleteCharacter);

// stats
router.get("/stats", Stats.getStats);

module.exports = router;
