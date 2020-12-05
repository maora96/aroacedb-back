const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();
const cors = require("@koa/cors");
const router = require("./src/routes");

server.use(cors({ origin: "*" }));
server.use(bodyparser());

server.use(router.routes()).use(router.allowedMethods());

server.listen(8081, () => console.log("no ar"));
