const database = require("../utils/database");

const addCharacter = async (character) => {
  const q = {
    text:
      "INSERT INTO characters (id, character_name, main_storyseries, author, genre, type_of_rep, gender, importance,sexual_orientation, romantic_orientation, relationships, pairing_qpp_or_romantic, rep_noteswarnings) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    values: [
      character.character_name,
      character.main_storyseries,
      character.author,
      character.genre,
      character.type_of_rep,
      character.gender,
      character.importance,
      character.sexual_orientation,
      character.romantic_orientation,
      character.relationships,
      character.pairing_qpp_or_romantic,
      character.rep_noteswarnings,
    ],
  };
  const query = await database.query(q);
  return query.rows;
};

const getCharacter = async (id) => {
  const q = {
    text: "SELECT * FROM characters where id = $1",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const deleteCharacter = async (id) => {
  const q = {
    text: "DELETE FROM characters where id = $1 returning *",
    values: [id],
  };
  const query = await database.query(q);
  return query.rows;
};

const getAllCharacters = async () => {
  const q = {
    text: "SELECT * FROM characters",
  };

  const query = await database.query(q);
  return query.rows;
};

const getAllCharactersPaginated = async (characters_per_page, offset) => {
  const q = {
    text: "SELECT * FROM characters limit $1 offset $2",
    values: [characters_per_page, offset],
  };

  const query = await database.query(q);
  return query.rows;
};

const updateCharacter = async (character) => {
  const q = {
    text:
      "UPDATE characters set character_name = $1, main_storyseries = $2, author = $3, genre = $4, type_of_rep = $5, gender = $6, importance = $7, sexual_orientation = $8, romantic_orientation = $9, relationships = $10, pairing_qpp_or_romantic = $11, rep_noteswarnings = $12 WHERE id = $13 returning *",
    values: [
      character.character_name,
      character.main_storyseries,
      character.author,
      character.genre,
      character.type_of_rep,
      character.gender,
      character.importance,
      character.sexual_orientation,
      character.romantic_orientation,
      character.relationships,
      character.pairing_qpp_or_romantic,
      character.rep_noteswarnings,
      character.id,
    ],
  };
  const query = await database.query(q);
  return query.rows.shift();
};

const searchCharacters = async (search) => {
  const queries = [];
  search.forEach((s) => {
    const text = `SELECT * FROM characters WHERE character_name ILIKE '%${s}%' OR main_storyseries ILIKE '%${s}%' OR author ILIKE '%${s}%' OR genre ILIKE '%${s}%' OR type_of_rep ILIKE '%${s}%' OR gender ILIKE '%${s}%' OR importance ILIKE '%${s}%' OR sexual_orientation ILIKE '%${s}%' OR romantic_orientation ILIKE '%${s}%' OR relationships ILIKE '%${s}%' OR pairing_qpp_or_romantic ILIKE '%${s}%'`;
    queries.push(text);
  });
  const formatted = [];
  console.log(queries);
  queries.forEach((q, i) => {
    if (i < queries.length - 1) {
      formatted.push(q + " INTERSECT ");
    } else {
      formatted.push(q);
    }
  });
  const final = formatted.join("");
  const q = {
    text: final,
  };

  const query = await database.query(q);

  return query.rows;
};

const searchCharactersPaginated = async (
  search,
  offset,
  characters_per_page
) => {
  const queries = [];
  search.forEach((s) => {
    const text = `SELECT * FROM characters WHERE character_name ILIKE '%${s}%' OR main_storyseries ILIKE '%${s}%' OR author ILIKE '%${s}%' OR genre ILIKE '%${s}%' OR type_of_rep ILIKE '%${s}%' OR gender ILIKE '%${s}%' OR importance ILIKE '%${s}%' OR sexual_orientation ILIKE '%${s}%' OR romantic_orientation ILIKE '%${s}%' OR relationships ILIKE '%${s}%' OR pairing_qpp_or_romantic ILIKE '%${s}%' `;
    queries.push(text);
  });
  const formatted = [];
  console.log(queries);
  queries.forEach((q, i) => {
    if (i < queries.length - 1) {
      formatted.push(q + " INTERSECT ");
    } else {
      formatted.push(q + ` limit ${characters_per_page} offset ${offset}`);
    }
  });
  const final = formatted.join("");
  console.log(final);
  const q = {
    text: final,
  };

  const query = await database.query(q);

  return query.rows;
};

const getRandomCharacter = async () => {
  const q = {
    text: "select * from characters order by random() limit 1",
  };

  const query = await database.query(q);
  console.log(query.rows[0]);
  return query.rows[0];
};

module.exports = {
  addCharacter,
  getCharacter,
  getAllCharacters,
  updateCharacter,
  searchCharacters,
  getRandomCharacter,
  deleteCharacter,
  getAllCharactersPaginated,
  searchCharactersPaginated,
};
