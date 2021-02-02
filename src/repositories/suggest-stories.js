const database = require("../utils/database");

const addStory = async (story) => {
  const q = {
    text:
      "INSERT INTO st_suggestions (id, character_id, story_title, series_or_anthology, genre, story_length, type_of_rep, character_importance, rep_noteswarnings, other_noteswarnings, cover) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
    values: [
      story.character_id,
      story.story_title,
      story.series_or_anthology,
      story.genre,
      story.story_length,
      story.type_of_rep,
      story.character_importance,
      story.rep_noteswarnings,
      story.other_noteswarnings,
      story.cover,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllStories = async () => {
  const q = {
    text: "SELECT * FROM st_suggestions",
  };

  const query = await database.query(q);
  return query.rows;
};

const getAllStoriesPaginated = async (stories_per_page, offset) => {
  const q = {
    text: "SELECT * FROM st_suggestions limit $1 offset $2",
    values: [stories_per_page, offset],
  };

  const query = await database.query(q);
  return query.rows;
};

const getStory = async (id) => {
  const q = {
    text: "SELECT * FROM st_suggestions where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const deleteStory = async (id) => {
  const q = {
    text: "DELETE FROM st_suggestions where id = $1 returning *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = {
  getStory,
  getAllStories,
  deleteStory,
  addStory,
  getAllStoriesPaginated,
};
