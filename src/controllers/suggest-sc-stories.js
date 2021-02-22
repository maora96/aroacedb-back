const Suggest = require("../repositories/suggest-sc-stories");
const response = require("./response");

const addStory = async (ctx) => {
  const {
    character_id = null,
    story_title = null,
    series_or_anthology = null,
    genre = null,
    story_length = null,
    type_of_rep = null,
    character_importance = null,
    rep_noteswarnings = null,
    other_noteswarnings = null,
    cover = null,
  } = ctx.request.body;

  if (
    !character_id &&
    !story_title &&
    !series_or_anthology &&
    !genre &&
    !story_length &&
    !type_of_rep &&
    !character_importance &&
    !rep_noteswarnings &&
    !other_noteswarnings &&
    !cover
  ) {
    response(ctx, 404, {
      message: "It's not possible to add an empty story",
    });
  }

  const story = {
    character_id,
    story_title,
    series_or_anthology,
    genre,
    story_length,
    type_of_rep,
    character_importance,
    rep_noteswarnings,
    other_noteswarnings,
    cover,
  };

  const dbStory = await Suggest.addStory(story);

  response(ctx, 201, { story });
};

const getStory = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const story = await Suggest.getStory(id);
    response(ctx, 201, { story });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const deleteStory = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const story = await Suggest.deleteStory(id);
    response(ctx, 201, { story });
  }
};

const getAllStories = async (ctx) => {
  const { offset } = ctx.query;
  const stories_per_page = 20;

  const paginated_stories = await Suggest.getAllStoriesPaginated(
    stories_per_page,
    offset
  );

  const stories = await Suggest.getAllStories();

  const stories_num = stories.length;

  const paginate = (pageSize, totalClients) => {
    return totalClients < pageSize ? 1 : Math.ceil(totalClients / pageSize);
  };

  const totalPages = paginate(stories_per_page, stories_num);

  const currentPage = Math.ceil(offset / stories_per_page) + 1;

  if (!stories) {
    response(ctx, 404, { message: "No stories found." });
  } else {
    response(ctx, 200, { currentPage, totalPages, paginated_stories });
  }
};

const getAllStoriesByCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const characterStories = await Suggest.getAllStories(id);
    response(ctx, 201, { stories: characterStories });
  } else {
    response(ctx, 404, "ID can not be null");
  }
};

const deleteAllCharacterStories = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const deletedStories = await Suggest.deleteAllCharacterStories(id);
    response(ctx, 201, { deletedStories });
  }
};

module.exports = {
  addStory,
  getStory,
  getAllStories,
  deleteStory,
  getAllStoriesByCharacter,
  deleteAllCharacterStories,
};
