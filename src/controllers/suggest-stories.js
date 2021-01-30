const Suggest = require("../repositories/suggest-stories");
const response = require("./response");

const addStory = async (ctx) => {
  const {
    character_id = null,
    story_title = null,
    series_or_anthology = null,
    genre = null,
    length = null,
    type_of_rep = null,
    character_importance = null,
    rep_noteswarnings = null,
    other_noteswarnings = null,
  } = ctx.request.body;

  if (
    !character_id &&
    !story_title &&
    !series_or_anthology &&
    !genre &&
    !length &&
    !type_of_rep &&
    !character_importance &&
    !rep_noteswarnings &&
    !other_noteswarnings
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
    length,
    type_of_rep,
    character_importance,
    rep_noteswarnings,
    other_noteswarnings,
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
  const stories = await Suggest.getAllStories();

  if (!stories) {
    response(ctx, 404, { message: "No characters found." });
  } else {
    response(ctx, 200, { stories });
  }
};

module.exports = {
  addStory,
  getStory,
  getAllStories,
  deleteStory,
};
