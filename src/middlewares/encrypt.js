const Password = require("../utils/password");

const encrypt = async (ctx, next) => {
  const { senha = null } = ctx.request.body;

  if (!senha) {
    response(ctx, 404, {
      mensagem: "Pedido mal-formatado",
    });
  }

  const hash = await Password.encrypt(senha);
  ctx.state.hash = hash;
  return next();
};

module.exports = { encrypt };
