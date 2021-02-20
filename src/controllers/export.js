const fastcsv = require("fast-csv");
const fs = require("fs");
const download = require("../repositories/export");
const path = require("path");

const exportTable = async (ctx) => {
  const { table = null } = ctx.params;
  console.log(table);
  const ws = fs.createWriteStream(__dirname + `/${table}.csv`);
  const database_table = await download.exportTable(table);

  if (database_table) {
    const jsonData = JSON.parse(JSON.stringify(database_table));
    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function () {
        console.log(
          `Postgres table ${table} exported to CSV file successfully.`
        );
      })
      .pipe(ws);

    ctx.body = fs.createReadStream(__dirname + `/${table}.csv`);
    console.log(ctx.body);
    ctx.attachment(__dirname + `/${table}.csv`);
    /// ??? send file ???
  }
};

module.exports = { exportTable };

// // res.header("Content-Type", "text/csv");
// // res.attachment(`${table}.csv`);

// var filePath = __dirname + `/${table}.csv`; // Or format the path using the `id` rest param
// var fileName = "stories.csv"; // The default name the browser will use

// res.download(filePath, fileName);
