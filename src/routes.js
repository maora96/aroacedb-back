const Router = require("koa-router");
const router = new Router();

const Auth = require("./controllers/auth");
const Characters = require("./controllers/characters");

const Password = require("./middlewares/encrypt");
const Session = require("./middlewares/session");

// auth

router.post("/auth", Auth.authenticate);

// characters

router.post("/characters", Characters.addCharacter);
router.put("/characters/:id", Characters.updateCharacter);
router.get("/characters/:id", Characters.getCharacter);
router.get("/characters", Characters.getAllCharacters);

module.exports = router;
