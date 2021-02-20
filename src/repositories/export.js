const database = require("../utils/database");

const exportTable = async (table) => {
  console.log(table);
  const q = {
    text: `select * from ${table}`,
  };
  const query = await database.query(q);
  return query.rows;
};

module.exports = { exportTable };
