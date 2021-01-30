const jwt = require("jsonwebtoken");
const Password = require("../utils/password");
const response = require("../controllers/response");

const User = require("../repositories/user");

const authenticate = async (ctx) => {
  const { email = null, password = null } = ctx.request.body;
  console.log(password);

  if (!email || !password) {
    response(ctx, 404, {
      mensagem: "Bad request.",
    });
  }

  const user = await User.getUserByEmail(email);
  console.log(password, user.password);

  if (user) {
    console.log(1);
    const comparison = await Password.check(password, user.password);
    console.log(2);
    if (comparison) {
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "riplaptop",
        {
          expiresIn: "1h",
        }
      );

      response(ctx, 200, {
        message: "User logged in.",
        token: token,
      });
    } else {
      response(ctx, 404, {
        message: "E-mail or password incorrect.",
      });
    }
  } else {
    response(ctx, 404, {
      message: "E-mail or password incorrect.",
    });
  }
};

module.exports = { authenticate };
