const Characters = require("../repositories/characters");
const response = require("../controllers/response");

const addCharacter = async (ctx) => {
  // const userID = ctx.state.userID
  const {
    character_name = null,
    main_storyseries = null,
    author = null,
    genre = null,
    type_of_rep = null,
    gender = null,
    importance = null,
    sexual_orientation = null,
    romantic_orientation = null,
    relationships = null,
    pairing_qpp_or_romantic = null,
    rep_noteswarnings = null,
  } = ctx.request.body;

  if (
    !character_name &&
    !main_storyseries &&
    !author &&
    !genre &&
    !type_of_rep &&
    !gender &&
    !importance &&
    !sexual_orientation &&
    !romantic_orientation &&
    !relationships &&
    !pairing_qpp_or_romantic &&
    !rep_noteswarnings
  ) {
    response(ctx, 404, {
      message: "It's not possible to add an empty character.",
    });
  }

  const character = {
    character_name,
    main_storyseries,
    author,
    genre,
    type_of_rep,
    gender,
    importance,
    sexual_orientation,
    romantic_orientation,
    relationships,
    pairing_qpp_or_romantic,
    rep_noteswarnings,
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
    character_name = null,
    main_storyseries = null,
    author = null,
    genre = null,
    type_of_rep = null,
    gender = null,
    importance = null,
    sexual_orientation = null,
    romantic_orientation = null,
    relationships = null,
    pairing_qpp_or_romantic = null,
    rep_noteswarnings = null,
  } = ctx.request.body;

  const { id = null } = ctx.params;
  const updatedCharacter = {
    id,
    character_name,
    main_storyseries,
    author,
    genre,
    type_of_rep,
    gender,
    importance,
    sexual_orientation,
    romantic_orientation,
    relationships,
    pairing_qpp_or_romantic,
    rep_noteswarnings,
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
  let one;
  let two;
  if (search) {
    one = search.toLowerCase().split(" ");
    two = [];
    for (let i = 0; i < one.length; i++) {
      if (one[i].includes("/")) {
        console.log("yeah");
        //   two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push(one[i].toUpperCase().replace(",", ""));
      } else {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
      }
    }
  }

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
