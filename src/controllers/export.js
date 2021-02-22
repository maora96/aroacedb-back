const fastcsv = require("fast-csv");
const fs = require("fs");
const download = require("../repositories/export");
const iconv = require("iconv-lite");
const json2csv = require("json2csv");
const { Parser } = require("json2csv");
const { AsyncParser } = require("json2csv");
const json2csvParser = new AsyncParser({ delimiter: "\t" });
const { parseAsync } = require("json2csv");

const exportTable = async (ctx) => {
  const { table = null } = ctx.params;
  console.log(table);
  const ws = iconv
    .encodeStream("utf8")
    .pipe(fs.createWriteStream(__dirname + `/${table}.csv`));
  const database_table = await download.exportTable(table);

  if (database_table) {
    const jsonData = JSON.parse(JSON.stringify(database_table));

    let fields = [
      "id",
      "character_name",
      "main_storyseries",
      "author",
      "genre",
      "type_of_rep",
      "gender",
      "importance",
      "sexual_orientation",
      "romantic_orientation",
      "relationships",
      "pairing_qpp_or_romantic",
      "rep_noteswarnings",
      "cover",
      "added_in",
    ];
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
    // fastcsv
    //   .write(jsonData, { headers: true, encoding: "binary" })
    //   .on("finish", function () {
    //     console.log(
    //       `Postgres table ${table} exported to CSV file successfully.`
    //     );
    //   })
    //   .pipe(ws);

    ctx.body = fs.createReadStream(`${table}.csv`, {
      encoding: "utf16le",
    });
    // console.log(ctx.body);
    ctx.attachment(`./${table}.csv`);
    /// ??? send file ???
  }
};

module.exports = { exportTable };

// // res.header("Content-Type", "text/csv");
// // res.attachment(`${table}.csv`);

// var filePath = __dirname + `/${table}.csv`; // Or format the path using the `id` rest param
// var fileName = "stories.csv"; // The default name the browser will use

// res.download(filePath, fileName);
