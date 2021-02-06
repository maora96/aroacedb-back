const Permissions = require("../repositories/permissions");
const response = require("./response");

const getPermissions = async (ctx) => {
  const permissions = await Permissions.getPermissions();
  response(ctx, 201, permissions);
};

const updateCharacter = async (ctx) => {
  const { checked = null } = ctx.request.body;

  const update = await Permissions.updateCharacter(checked);
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
