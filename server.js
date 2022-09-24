const http = require("http");

const app = require("./src/app");
const sequelize = require("./src/database/dbConnect");
const { SERVER_PORT } = require("./src/utils/serverConfig");

const server = http.createServer(app);

const startServer = async () => {
  try {
    await sequelize.sync();
    server.listen(SERVER_PORT, () => {
      console.log("Server running on port " + SERVER_PORT);
    });
    console.log("Connection estabilished");
  } catch (error) {
    console.log(error);
    process.exit();
  }
  
};

startServer();
