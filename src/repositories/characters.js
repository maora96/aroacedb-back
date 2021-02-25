const database = require("../utils/database");

const addCharacter = async (character) => {
  const q = {
    text:
      "INSERT INTO characters (id, character_name, main_storyseries, author, genre, type_of_rep, gender, importance,sexual_orientation, romantic_orientation, relationships, pairing_qpp_or_romantic, rep_noteswarnings, cover) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
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
      character.cover,
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
    text: "SELECT * FROM characters order by character_name asc",
  };

  const query = await database.query(q);
  return query.rows;
};

const getAllCharactersPaginated = async (characters_per_page, offset) => {
  const q = {
    text:
      "SELECT * FROM characters order by character_name asc limit $1 offset $2",
    values: [characters_per_page, offset],
  };

  const query = await database.query(q);
  return query.rows;
};

const updateCharacter = async (character) => {
  const q = {
    text:
      "UPDATE characters set character_name = $1, main_storyseries = $2, author = $3, genre = $4, type_of_rep = $5, gender = $6, importance = $7, sexual_orientation = $8, romantic_orientation = $9, relationships = $10, pairing_qpp_or_romantic = $11, rep_noteswarnings = $12, cover = $13 WHERE id = $14 returning *",
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
      character.cover,
      character.id,
    ],
  };
  const query = await database.query(q);
  return query.rows.shift();
};

const searchCharacters = async (search) => {
  console.log("search", search);
  const qs = ["select * from characters where "];

  if (search.character_name) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`character_name ilike '%${search.character_name}%'`);
    } else {
      qs.push(`character_name ilike '%${search.character_name}%'`);
    }
  }
  if (search.importance) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`importance ilike '%${search.importance}%'`);
    } else {
      qs.push(`importance ilike '%${search.importance}%'`);
    }
  }

  if (search.author) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`author ilike '%${search.author}%'`);
    } else {
      qs.push(`author ilike '%${search.author}%'`);
    }
  }

  if (search.gender) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`gender ilike '%${search.gender}%'`);
    } else {
      qs.push(`gender ilike '%${search.gender}%'`);
    }
  }

  if (search.pairing_qpp_or_romantic) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(
        `pairing_qpp_or_romantic ilike '%${search.pairing_qpp_or_romantic}%'`
      );
    } else {
      qs.push(
        `pairing_qpp_or_romantic ilike '%${search.pairing_qpp_or_romantic}%'`
      );
    }
  }

  if (search.romantic_orientation) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`romantic_orientation ilike '%${search.romantic_orientation}%'`);
    } else {
      qs.push(`romantic_orientation ilike '%${search.romantic_orientation}%'`);
    }
  }

  if (search.sexual_orientation) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`sexual_orientation ilike '%${search.sexual_orientation}%'`);
    } else {
      qs.push(`sexual_orientation ilike '%${search.sexual_orientation}%'`);
    }
  }

  if (search.main_storyseries) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`main_storyseries ilike '%${search.main_storyseries}%'`);
    } else {
      qs.push(`main_storyseries ilike '%${search.main_storyseries}%'`);
    }
  }

  if (search.genre) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`genre ilike '%${search.genre}%'`);
    } else {
      qs.push(`genre ilike '%${search.genre}%'`);
    }
  }

  if (search.relationships) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`relationships ilike '%${search.relationships}%'`);
    } else {
      qs.push(`relationships ilike '%${search.relationships}%'`);
    }
  }

  if (search.type_of_rep) {
    if (qs.length > 1) {
      qs.push(" AND ");
      qs.push(`type_of_rep ilike '%${search.type_of_rep}%'`);
    } else {
      qs.push(`type_of_rep ilike '%${search.type_of_rep}%'`);
    }
  }

  console.log(qs);
  let qs_stories = "";

  if (search.story_length) {
    qs_stories = `select distinct character_id from stories where story_length ilike '%${search.story_length}%'`;
  }

  const new_formatted = qs.join("");
  let final = ``;
  if (qs_stories) {
    final =
      `select distinct * from (` +
      new_formatted +
      `) c2 where c2.id in (${qs_stories}) `;
  } else {
    final = new_formatted;
  }

  console.log(final);

  const q = {
    text: final,
  };

  const query = await database.query(q);

  return query.rows;
};

const searchSingleField = async (search) => {
  const queries = [];
  const stories_q = [];
  search.forEach((s) => {
    const text = `select distinct * from (SELECT * FROM characters WHERE character_name ILIKE '%${s}%' OR main_storyseries ILIKE '%${s}%' OR author ILIKE '%${s}%' OR genre ILIKE '%${s}%' OR type_of_rep ILIKE '%${s}%' OR gender ILIKE '%${s}%' OR importance ILIKE '%${s}%' OR sexual_orientation ILIKE '%${s}%' OR romantic_orientation ILIKE '%${s}%' OR relationships ILIKE '%${s}%' OR pairing_qpp_or_romantic ILIKE '%${s}%' OR rep_noteswarnings ILIKE '%${s}%' union  select * from "characters" c2
      where c2.id in (select distinct character_id from stories
      where story_title ilike '%${s}%'
      or series_or_anthology ilike '%${s}%'
      or genre ilike '%${s}%'
      or story_length ilike '%${s}%'
      or type_of_rep ilike '%${s}%'
      or character_importance ilike '%${s}%'
      or rep_noteswarnings ilike '%${s}%'
      or other_noteswarnings ilike '%${s}%')) as css
      `;
    queries.push(text);
  });

  const formatted = [];
  console.log(queries);
  queries.forEach((q, i) => {
    if (i < queries.length - 1) {
      formatted.push(q + " UNION ");
    } else {
      formatted.push(q);
    }
  });
  formatted.push(" order by character_name asc");
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
    const text = `SELECT * FROM characters WHERE character_name ILIKE '%${s}%' OR main_storyseries ILIKE '%${s}%' OR author ILIKE '%${s}%' OR genre ILIKE '%${s}%' OR type_of_rep ILIKE '%${s}%' OR gender ILIKE '%${s}%' OR importance ILIKE '%${s}%' OR sexual_orientation ILIKE '%${s}%' OR romantic_orientation ILIKE '%${s}%' OR relationships ILIKE '%${s}%' OR pairing_qpp_or_romantic ILIKE '%${s}%' OR rep_noteswarnings ILIKE '%${s}%'`;
    queries.push(text);
  });
  const formatted = [];
  console.log(queries);
  queries.forEach((q, i) => {
    if (i < queries.length - 1) {
      formatted.push(q + " UNION ");
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
  searchSingleField,
};
