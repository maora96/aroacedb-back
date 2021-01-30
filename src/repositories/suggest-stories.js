const database = require("../utils/database");

const addStory = async (story) => {
  const q = {
    text:
      "INSERT INTO st_suggestions (id, character_id, story_title, series_or_anthology, genre, length, type_of_rep, character_importance, rep_noteswarnings, other_noteswarnings) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    values: [
      story.character_id,
      story.story_title,
      story.series_or_anthology,
      story.genre,
      story.length,
      story.type_of_rep,
      story.character_importance,
      story.rep_noteswarnings,
      story.other_noteswarnings,
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
};
