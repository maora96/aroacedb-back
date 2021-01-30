const stories = require("../repositories/stories");
const response = require("../controllers/response");

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
    response(ctx, 404, { message: "It's not possible to add an empty story" });
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

  const dbStory = await stories.addStory(story);

  response(ctx, 201, { story: story });
};

const getStory = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const story = await stories.getStory(id);
    response(ctx, 201, { story: story });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const getAllStoriesByCharacter = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const characterStories = await stories.getAllStories(id);
    response(ctx, 201, { stories: characterStories });
  } else {
    response(ctx, 404, "ID can't be null");
  }
};

const deleteStory = async (ctx) => {
  const { id = null } = ctx.params;

  if (id) {
    const story = await stories.deleteStory(id);
    response(ctx, 201, { story });
  }
};

const updateStory = async (ctx) => {
  const {
    story_title = null,
    series_or_anthology = null,
    genre = null,
    length = null,
    type_of_rep = null,
    character_importance = null,
    rep_noteswarnings = null,
    other_noteswarnings = null,
  } = ctx.request.body;

  const { id = null } = ctx.params;
  console.log(id);

  if (id) {
    const story = await stories.getStory(id);
    if (story) {
      const update = await stories.updateStory(
        id,
        story_title,
        series_or_anthology,
        genre,
        length,
        type_of_rep,
        character_importance,
        rep_noteswarnings,
        other_noteswarnings
      );
      response(ctx, 200, update);
    } else {
      response(ctx, 404, { message: "Story not found." });
    }
  } else {
    response(ctx, 404, { message: "ID needed." });
  }
};

module.exports = {
  addStory,
  getStory,
  getAllStoriesByCharacter,
  updateStory,
  deleteStory,
};
