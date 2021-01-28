const Characters = require("../repositories/characters");
const response = require("../controllers/response");

const addCharacter = async (ctx) => {
  // const userID = ctx.state.userID
  const {
    characterName = null,
    mainStory = null,
    author = null,
    genre = null,
    stories = null,
    reviews = null,
    typeOfRep = null,
    gender = null,
    importance = null,
    sexualOrientation = null,
    romanticOrientation = null,
    relationships = null,
    pairing = null,
    warnings = null,
  } = ctx.request.body;

  if (
    !characterName &&
    !mainStory &&
    !author &&
    !genre &&
    !stories &&
    !reviews &&
    !typeOfRep &&
    !gender &&
    !importance &&
    !sexualOrientation &&
    !romanticOrientation &&
    !relationships &&
    !pairing &&
    !warnings
  ) {
    response(ctx, 404, {
      message: "It's not possible to add an empty character.",
    });
  }

  const character = {
    characterName,
    mainStory,
    author,
    genre,
    stories,
    reviews,
    typeOfRep,
    gender,
    importance,
    sexualOrientation,
    romanticOrientation,
    relationships,
    pairing,
    warnings,
  };

  const dbCharacter = await Characters.addCharacter(character);

  response(ctx, 201, {
    character: {
      character,
    },
  });
};

const updateCharacter = async (ctx) => {
  const {
    characterName = null,
    mainStory = null,
    author = null,
    genre = null,
    typeOfRep = null,
    gender = null,
    importance = null,
    sexualOrientation = null,
    romanticOrientation = null,
    relationships = null,
    pairing = null,
    warnings = null,
  } = ctx.request.body;

  console.log(characterName);

  const { id = null } = ctx.params;
  const updatedCharacter = {
    id,
    characterName,
    mainStory,
    author,
    genre,
    typeOfRep,
    gender,
    importance,
    sexualOrientation,
    romanticOrientation,
    relationships,
    pairing,
    warnings,
  };

  if (id) {
    const character = await Characters.getCharacter(id);
    if (character) {
      const update = await Characters.updateCharacter(updatedCharacter);
      response(ctx, 200, update);
    } else {
      response(ctx, 404, { message: "Character not found." });
    }
  } else {
    response(ctx, 404, { message: "ID needed." });
  }
};

const getCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const character = await Characters.getCharacter(id);
    response(ctx, 201, { character: character });
  } else {
    response(ctx, 404, "ID can't be null.");
  }
};

const deleteCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const character = await Characters.deleteCharacter(id);
    response(ctx, 201, { character });
  }
};

const getAllCharacters = async (ctx) => {
  const { search = null } = ctx.query;
  let one = search.toLowerCase().split(" ");
  let two = [];
  for (let i = 0; i < one.length; i++) {
    two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
  }
  let three = two.join(" ");
  console.log(one, two, three);
  let character;

  if (!search) {
    character = await Characters.getAllCharacters();
  } else {
    character = await Characters.searchCharacters(two);
  }

  if (!character) {
    response(ctx, 404, { message: "No character found." });
  } else {
    response(ctx, 200, { characters: character });
  }
};

const getRandomCharacter = async (ctx) => {
  const character = await Characters.getRandomCharacter();
  if (character) {
    response(ctx, 200, character);
  } else {
    response(ctx, 404, { message: "No character found." });
  }
};

module.exports = {
  addCharacter,
  updateCharacter,
  getCharacter,
  getAllCharacters,
  getRandomCharacter,
  deleteCharacter,
};
