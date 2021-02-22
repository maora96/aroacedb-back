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
const User = require("./controllers/user");
const Permissions = require("./controllers/permissions");
const SuggestSC = require("./controllers/suggest-sc-stories");
const Session = require("./middlewares/session");
const Download = require("./controllers/export");

// auth

router.post("/auth", Auth.authenticate);

// user

router.post("/user", User.addUser);

// characters

router.post("/characters", Session.verify, Characters.addCharacter);
router.put("/characters/:id", Session.verify, Characters.updateCharacter);
router.get("/characters/:id", Characters.getCharacter);
router.get("/characters", Characters.getAllCharacters);
router.get("/character", Characters.getRandomCharacter);
router.delete("/characters/:id", Session.verify, Characters.deleteCharacter);
router.get("/character/infinite", Characters.getAllCharactersInfinite);

// stories

router.get("/stories/:id", Stories.getStory);
router.get("/stories/character/:id", Stories.getAllStoriesByCharacter);
router.put("/stories/:id", Session.verify, Stories.updateStory);
router.post("/stories", Session.verify, Stories.addStory);
router.delete("/stories/:id", Session.verify, Stories.deleteStory);
router.delete(
  "/stories/character/:id",
  Session.verify,
  Stories.deleteAllCharacterStories
);

// reviews

router.get("/reviews/character/:id", Reviews.getAllReviewsByCharacter);
router.put("/reviews/:id", Session.verify, Reviews.updateReview);
router.get("/reviews/:id", Reviews.getReview);
router.post("/reviews", Session.verify, Reviews.addReview);
router.delete("/reviews/:id", Session.verify, Reviews.deleteReview);
router.delete(
  "/reviews/character/:id",
  Session.verify,
  Reviews.deleteAllCharacterReviews
);

// suggest characters

router.post("/suggest/characters", SuggestCharacters.addCharacter);
router.get("/suggest/characters/recent", SuggestCharacters.getRecentSuggested);
router.get("/suggest/characters/:id", SuggestCharacters.getCharacter);
router.get("/suggest/characters", SuggestCharacters.getAllCharacters);
router.delete(
  "/suggest/characters/:id",
  Session.verify,
  SuggestCharacters.deleteCharacter
);

// suggest stories

router.post("/suggest/stories", SuggestStories.addStory);
router.get("/suggest/stories/:id", SuggestStories.getStory);
router.get("/suggest/stories", SuggestStories.getAllStories);
router.delete(
  "/suggest/stories/:id",
  Session.verify,
  SuggestStories.deleteStory
);

// suggest reviews

router.post("/suggest/reviews", SuggestReviews.addReview);
router.get("/suggest/reviews/:id", SuggestReviews.getReview);
router.get("/suggest/reviews", SuggestReviews.getAllReviews);
router.delete(
  "/suggest/reviews/:id",
  Session.verify,
  SuggestReviews.deleteReview
);

// stats
router.get("/stats", Stats.getStats);

// permissions
router.get("/permissions", Permissions.getPermissions);
router.post("/permissions/story", Permissions.updateStory);
router.post("/permissions/character", Permissions.updateCharacter);
router.post("/permissions/review", Permissions.updateReview);

// download csv files

router.get("/download/:table", Download.exportTable);
module.exports = router;

// suggest stories to suggested characters

router.post("/suggest/sc/stories", SuggestSC.addStory);
router.get("/suggest/sc/stories/:id", SuggestSC.getStory);
router.get(
  "/suggest/sc/character/stories/:id",
  SuggestSC.getAllStoriesByCharacter
);
router.get("/suggest/sc/stories", SuggestSC.getAllStories);
router.delete("/suggest/sc/stories/:id", Session.verify, SuggestSC.deleteStory);
router.delete(
  "/suggest/sc/character/stories/:id",
  Session.verify,
  SuggestSC.deleteAllCharacterStories
);
