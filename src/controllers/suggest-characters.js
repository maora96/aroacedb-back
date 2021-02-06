const Suggest = require("../repositories/suggest-characters");
const response = require("./response");

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
    reference = null,
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
    !cover &&
    !reference
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
    reference,
  };

  console.log(character);
  const dbCharacter = await Suggest.addCharacter(character);

  response(ctx, 201, {
    character,
  });
};

const getRecentSuggested = async (ctx) => {
  const recentlyAdded = await Suggest.getRecentSuggested();
  if (recentlyAdded) {
    response(ctx, 201, {
      recentlyAdded,
    });
  } else {
    response(ctx, 404, {
      message: "No entries found.",
    });
  }
};

const getCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const character = await Suggest.getCharacter(id);
    response(ctx, 201, { character });
  } else {
    response(ctx, 404, "ID can't be null.");
  }
};

const deleteCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const character = await Suggest.deleteCharacter(id);
    response(ctx, 201, { character });
  }
};

const getAllCharacters = async (ctx) => {
  const { offset } = ctx.query;
  const characters_per_page = 20;
  const paginated_characters = await Suggest.getAllCharactersPaginated(
    characters_per_page,
    offset
  );

  const characters = await Suggest.getAllCharacters();

  const characters_num = characters.length;

  const paginate = (pageSize, totalClients) => {
    return totalClients < pageSize ? 1 : Math.ceil(totalClients / pageSize);
  };

  const totalPages = paginate(characters_per_page, characters_num);

  const currentPage = Math.ceil(offset / characters_per_page) + 1;

  if (!characters && !paginated_characters) {
    response(ctx, 404, { message: "No characters found." });
  } else {
    response(ctx, 200, { currentPage, totalPages, paginated_characters });
  }
};

module.exports = {
  addCharacter,
  getRecentSuggested,
  getCharacter,
  getAllCharacters,
  deleteCharacter,
};
