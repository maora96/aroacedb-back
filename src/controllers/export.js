const fs = require("fs");
const download = require("../repositories/export");
const { parseAsync } = require("json2csv");

const exportTable = async (ctx) => {
  const { table = null } = ctx.params;
  console.log(table);
  const database_table = await download.exportTable(table);

  if (database_table) {
    const jsonData = JSON.parse(JSON.stringify(database_table));

    let csvStr = await parseAsync(jsonData);
    fs.writeFileSync(
      `${table}.csv`,
      "\ufeff" + csvStr,
      { encoding: "utf16le" },
      function (err) {
        if (err) throw err;
        console.log("file saved");
      }
    );

    ctx.body = fs.createReadStream(`${table}.csv`, {
      encoding: "utf16le",
    });

    ctx.attachment(`./${table}.csv`);
  }
};

module.exports = { exportTable };

// // res.header("Content-Type", "text/csv");
// // res.attachment(`${table}.csv`);

// var filePath = __dirname + `/${table}.csv`; // Or format the path using the `id` rest param
// var fileName = "stories.csv"; // The default name the browser will use

// res.download(filePath, fileName);
