const fs = require("node:fs");
const path = require("node:path");

class RouteBuilder {
  constructor() {}

  getHTTPRoutes(transport) {
    // const routesDir = fs.readdirSync(path.join(__dirname));

    console.log('path dirname: ', __dirname);
  }
}

module.exports = RouteBuilder;
