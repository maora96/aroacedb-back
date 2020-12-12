const jwt = require("jsonwebtoken");
const response = require("../controllers/response");
require("dotenv").config();

const verify = async (ctx, next) => {
  const [bearer, token] = ctx.headers.authorization.split(" ");

  try {
    const verification = await jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.userId = verification.id;
    ctx.state.email = verification.email;
  } catch (err) {
    response(ctx, 404, {
      mensagem: "Ação proibida",
    });
  }
  return next();
};

module.exports = { verify };
