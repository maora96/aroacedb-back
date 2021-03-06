const About = require("../repositories/about");
const response = require("../controllers/response");

const updateAboutDatabase = async (ctx) => {
  const { the_database, database_structure } = ctx.request.body;

  if (!the_database && !database_structure) {
    response(ctx, 404, { message: "Fields must not be empty." });
  }

  const about = {
    the_database,
    database_structure,
  };

  const dbAbout = await About.updateAboutDatabase(about);
  response(ctx, 201, { dbAbout });
};

const updateAboutTeam = async (ctx) => {
  const { the_creator, gremlins, dev } = ctx.request.body;

  if (!the_creator && !gremlins && !dev) {
    response(ctx, 404, { message: "Fields must not be empty." });
  }

  const about = {
    the_creator,
    gremlins,
    dev,
  };

  const dbAbout = await About.updateAboutTeam(about);
  response(ctx, 201, { dbAbout });
};

module.exports = {
  updateAboutDatabase,
  updateAboutTeam,
};
