const database = require("../utils/database");

const addStory = async (story) => {
  const q = {
    text:
      "INSERT INTO stories (id, character_id, story_title, series_or_anthology, genre, length, type_of_rep, character_importance, rep_noteswarnings, other_noteswarnings) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
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

const deleteStory = async (id) => {
  const q = {
    text: "DELETE FROM stories where id = $1 returning *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const deleteAllCharacterStories = async (id) => {
  const q = {
    text: "DELETE FROM stories where character_id = $1 returning *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getStory = async (id) => {
  const q = {
    text: "SELECT * FROM stories where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllStories = async (id) => {
  const q = {
    text: "SELECT * FROM stories where character_id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const updateStory = async (
  id,
  story_title,
  series_or_anthology,
  genre,
  length,
  type_of_rep,
  character_importance,
  rep_noteswarnings,
  other_noteswarnings
) => {
  const q = {
    text:
      "UPDATE stories set story_title = $1, series_or_anthology = $2, genre = $3, length = $4, type_of_rep = $5, character_importance = $6, rep_noteswarnings = $7, other_noteswarnings = $8 WHERE id = $9 returning *",
    values: [
      story_title,
      series_or_anthology,
      genre,
      length,
      type_of_rep,
      character_importance,
      rep_noteswarnings,
      other_noteswarnings,
      id,
    ],
  };
  const query = await database.query(q);
  return query.rows.shift();
};

module.exports = {
  addStory,
  getStory,
  getAllStories,
  updateStory,
  deleteStory,
  deleteAllCharacterStories,
};
