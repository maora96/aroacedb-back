const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const PORT = process.env.PORT || 8081;
const server = new Koa();
const cors = require("@koa/cors");
const router = require("./src/routes");

server.use(cors({ origin: "*" }));
server.use(bodyparser());

server.use(router.routes()).use(router.allowedMethods());

server.listen(process.env.PORT || 8081, "0.0.0.0", null, () =>
  console.log("back working")
);
