const http = require("http2");

const app = require("./src/app");
const User = require("./src/components/user/userModel");
const { SERVER_PORT } = require("./src/utils/serverConfig");

const server = http.createServer(app);

const startServer = async () => {
  try {
    await User.sync();
    server.listen(SERVER_PORT);
    console.log("Connection estabilished");
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
