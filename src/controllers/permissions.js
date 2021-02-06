const Permissions = require("../repositories/permissions");
const response = require("./response");

const getPermissions = async (ctx) => {
  const permissions = await Permissions.getPermissions();
  let data = {};

  permissions.map((p) => {
    if (p.checked_name === "character") {
      data.character = p;
    }

    if (p.checked_name === "review") {
      data.review = p;
    }

    if (p.checked_name === "story") {
      data.story = p;
    }
  });
  console.log(data);
  response(ctx, 201, data);
};

const updateCharacter = async (ctx) => {
  const { checked = null } = ctx.request.body;

  const update = await Permissions.updateCharacter(checked);
  console.log(update);
  if (update) {
    response(ctx, 200, update);
  } else {
    response(ctx, 401, { message: "Error updating." });
  }
};

const updateStory = async (ctx) => {
  const { checked = null } = ctx.request.body;

  const update = await Permissions.updateStory(checked);
  if (update) {
    response(ctx, 200, update);
  } else {
    response(ctx, 401, { message: "Error updating." });
  }
};

const updateReview = async (ctx) => {
  const { checked = null } = ctx.request.body;

  const update = await Permissions.updateReview(checked);
  if (update) {
    response(ctx, 200, update);
  } else {
    response(ctx, 401, { message: "Error updating." });
  }
};

module.exports = {
  getPermissions,
  updateCharacter,
  updateReview,
  updateStory,
};
