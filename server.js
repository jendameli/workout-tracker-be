const app = require("./src/app");
const http = require("http2");
const { SERVER_PORT } = require("./src/utils/serverConfig");

const server = http.createServer(app);

server.listen(SERVER_PORT, () => console.log("Listening on port " + SERVER_PORT));
