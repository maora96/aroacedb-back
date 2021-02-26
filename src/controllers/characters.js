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
    cover = null,
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
    !rep_noteswarnings &&
    !cover
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
    cover,
  };

  const dbCharacter = await Characters.addCharacter(character);

  response(ctx, 201, {
    dbCharacter,
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
    cover = null,
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
    cover,
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
    response(ctx, 201, { character });
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

const getAllCharactersInfinite = async (ctx) => {
  const {
    character_name = null,
    importance = null,
    author = null,
    gender = null,
    pairing_qpp_or_romantic = null,
    romantic_orientation = null,
    sexual_orientation = null,
    main_storyseries = null,
    genre = null,
    relationships = null,
    story_length = null,
    type_of_rep = null,
  } = ctx.query;

  const search_advanced = {};
  if (character_name) {
    search_advanced.character_name = character_name;
  }
  if (importance) {
    search_advanced.importance = importance;
  }
  if (author) {
    search_advanced.author = author;
  }

  if (gender) {
    search_advanced.gender = gender;
  }

  if (pairing_qpp_or_romantic) {
    search_advanced.pairing_qpp_or_romantic = pairing_qpp_or_romantic;
  }

  if (romantic_orientation) {
    search_advanced.romantic_orientation = romantic_orientation;
  }

  if (sexual_orientation) {
    search_advanced.sexual_orientation = sexual_orientation;
  }

  if (main_storyseries) {
    search_advanced.main_storyseries = main_storyseries;
  }

  if (genre) {
    search_advanced.genre = genre;
  }

  if (relationships) {
    search_advanced.relationships = relationships;
  }

  if (story_length) {
    search_advanced.story_length = story_length;
  }

  if (type_of_rep) {
    search_advanced.type_of_rep = type_of_rep;
  }

  const { search = null } = ctx.query;
  let one;
  let two;
  if (search) {
    one = search.toLowerCase().split(" ");
    two = [];
    console.log("one", one);
    for (let i = 0; i < one.length; i++) {
      if (one[i].includes("/")) {
        two.push(one[i].toUpperCase().replace(",", ""));
      } else if (
        one[i].includes("grayasexual") ||
        one[i].includes("gray-sexual") ||
        one[i].includes("greysexual") ||
        one[i].includes("gray-sexual") ||
        one[i].includes("graysexual") ||
        one[i].includes("greyasexual")
      ) {
        one.splice(i, 1, "gray-asexual");
        console.log("hiya:", one);
        two.push(one[i]);
      } else if (
        one[i].includes("grayromantic") ||
        one[i].includes("gray-romantic") ||
        one[i].includes("greyromantic") ||
        one[i].includes("gray-romantic") ||
        one[i].includes("grayromantic") ||
        one[i].includes("greyromantic")
      ) {
        one.splice(i, 1, "grey-romantic");
        two.push(one[i]);
      } else if (one[i].includes("acespec")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("demisexual");
        two.push("gray-sexual");
        two.push("gray-sexual");
        two.push("grey-sexual");
      } else if (one[i].includes("arospec") || one[i].includes("Arospec")) {
        console.log("hi", one);
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("demiromantic");
        two.push("demi-romantic");
        two.push("gray-romantic");
        two.push("grey-romantic");
      } else if (one[i].includes("allosexual")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("heterosexual");
        two.push("bisexual");
        two.push("pansexual");
        two.push("gay");
      } else if (one[i].includes("alloromantic")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("heteroromanti");
        two.push("biromantic");
        two.push("panromantic");
        two.push("homoromantic");
      } else {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
      }
    }
  }

  if (search) {
    console.log(search);
    const characters = await Characters.searchSingleField(two);
    response(ctx, 200, { characters });
  } else {
    const characters = await Characters.searchCharacters(search_advanced);
    response(ctx, 200, { characters });
  }
};

const getAllCharacters = async (ctx) => {
  const { search = null, offset = null } = ctx.query;
  let one;
  let two;
  if (search) {
    one = search.toLowerCase().split(" ");
    two = [];
    for (let i = 0; i < one.length; i++) {
      if (one[i].includes("/")) {
        two.push(one[i].toUpperCase().replace(",", ""));
      } else if (
        one[i].includes("grayasexual") ||
        one[i].includes("gray-sexual") ||
        one[i].includes("greysexual") ||
        one[i].includes("gray-sexual") ||
        one[i].includes("graysexual") ||
        one[i].includes("greyasexual")
      ) {
        one.splice(i, 1, "gray-asexual");
        console.log("hiya:", one);
        two.push(one[i]);
      } else if (
        one[i].includes("grayromantic") ||
        one[i].includes("gray-romantic") ||
        one[i].includes("greyromantic") ||
        one[i].includes("gray-romantic") ||
        one[i].includes("grayromantic") ||
        one[i].includes("greyromantic")
      ) {
        one.splice(i, 1, "grey-romantic");
        console.log("hiya:", one);
        two.push(one[i]);
      } else if (one[i].includes("acespec")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("demisexual");
        two.push("gray-sexual");
      } else if (one[i].includes("arospec") || one[i].includes("Arospec")) {
        console.log("hi", one);
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("demiromantic");
        two.push("demi-romantic");
      } else if (one[i].includes("allosexual")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("heterosexual");
        two.push("bisexual");
        two.push("pansexual");
        two.push("gay");
      } else if (one[i].includes("alloromantic")) {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
        two.push("heteroromanti");
        two.push("biromantic");
        two.push("panromantic");
        two.push("homoromantic");
      } else {
        two.push(one[i][0].toUpperCase() + one[i].slice(1).replace(",", ""));
      }
    }
  }

  let characters;
  let paginated_character;
  console.log(two);
  const characters_per_page = 20;

  if (!search) {
    characters = await Characters.getAllCharacters();
    paginated_characters = await Characters.getAllCharactersPaginated(
      characters_per_page,
      offset
    );
  } else {
    characters = await Characters.searchCharacters(two);
    paginated_characters = await Characters.searchCharactersPaginated(
      two,
      offset,
      characters_per_page
    );
    console.log(search);
    console.log(offset);
  }

  const characters_num = characters.length;

  const paginate = (pageSize, totalClients) => {
    return totalClients < pageSize ? 1 : Math.ceil(totalClients / pageSize);
  };

  const totalPages = paginate(characters_per_page, characters_num);

  const currentPage = Math.ceil(offset / characters_per_page) + 1;

  if (!characters && !paginated_character) {
    response(ctx, 404, { message: "No character found." });
  } else {
    response(ctx, 200, { currentPage, totalPages, paginated_characters });
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
  getAllCharactersInfinite,
};
