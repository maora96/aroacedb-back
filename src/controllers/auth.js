const jwt = require("jsonwebtoken");
const Password = require("../utils/password");
const response = require("../controllers/response");

const authenticate = async (ctx) => {
  const { email = null, senha = null } = ctx.request.body;

  if (!email || !senha) {
    response(ctx, 404, {
      mensagem: "Pedido mal-formatado!",
    });
  }

  const user = await Users.getUserByEmail(email);

  if (user) {
    const comparison = await Password.check(senha, user.senha);
    if (comparison) {
      const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "riplaptop",
        {
          expiresIn: "1h",
        }
      );
      ctx.body = token;
      response(ctx, 200, {
        mensagem: "Usuário logado com sucesso!",
        token: token,
      });
    } else {
      response(ctx, 404, {
        mensagem: "E-mail ou senha incorretos.",
      });
    }
  } else {
    response(ctx, 404, {
      mensagem: "E-mail ou senha incorretos.",
    });
  }
};

module.exports = { authenticate };
