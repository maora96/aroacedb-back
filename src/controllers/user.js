const response = require("./response");
const Password = require("../utils/password");
const User = require("../repositories/user");

const addUser = async (ctx) => {
  const { email = null, password = null } = ctx.request.body;

  const { hash } = ctx.state;

  if (!email || !password) {
    return response(ctx, 400, { message: "Bad request." });
  }

  const encrypted_password = await Password.encrypt(password);
  console.log(encrypted_password);

  const user = await User.getUserByEmail(email);
  console.log(user);

  if (user) {
    return response(ctx, 401, { message: "User already registered." });
  }

  const data = {
    email,
    password: encrypted_password,
  };

  const new_user = await User.addUser(data);

  if (new_user) {
    return response(ctx, 201, { new_user });
  }
};

module.exports = { addUser };
