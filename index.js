const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();
const cors = require("@koa/cors");
const router = require("./src/routes");

server.use(cors({ origin: "*" }));
server.use(bodyparser());

server.use(router.routes()).use(router.allowedMethods());

server.listen(8081, () => console.log("no ar"));

/*frontpage:
- search = by all properties (minus id) [searchCharacters, on click => getCharacter]
- button = goes to suggest a book page 
- login

if admin (login goes to dashboard): 
- view suggested characters, with option to add to database
- button to add character (goes to another page)
- view all characters, with buttons to edit or delete them (goes to another page ?)*/
