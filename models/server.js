const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT; // Loaded from .env file
    this.paths = {
      default: "/",
      auth: "/api/auth",
      homepage: "/api/homepage",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors()); // Enable CORS
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.default, require("../routes/auth"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.homepage, require("../routes/homepage"));
    this.app.use(express.static(path.join(__dirname, 'build')));
    this.app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    this.app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!");
    })
    this.app.all('*', (req, res) => {
      res.status(404).send('<h1>404! Page not found</h1>');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;