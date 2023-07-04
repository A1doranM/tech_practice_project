const fs = require("node:fs").promises;
const vm = require("node:vm");
const path = require("node:path");
const signInService = require("../auth-logic/sign-in");

class RouteBuilder {
  #sandbox;
  #RUN_OPTIONS;

  constructor() {
    this.#RUN_OPTIONS = { timeout: 5000, displayErrors: false };
  }

  async #load(filePath, sandbox) {
    const sandbox2 = {
      console: {p: 9},
      console2: console,
      signInService: signInService
    };

    const src = await fs.readFile(filePath, "utf8");
    const code = `"use strict";\n${src}`;
    const script = new vm.Script(code);
    console.log({ script });
    const context = vm.createContext(Object.freeze({ ...sandbox2 }));
    const exported = script.runInContext(context, this.#RUN_OPTIONS);
    console.log({ exported });
    return exported;
  }

  async getHTTPRoutes() {
    const routesDir = await fs.readdir(path.join(__dirname, 'http'));

    const routes = {};

    for (const route of routesDir) {
      const routeController = await fs.readFile(path.join(__dirname, 'http', route, 'index.js'));
      routes[route] = await this.#load(routeController)
    }

    console.log('Routes: ', routes);

    return routes;
  }
}

module.exports = RouteBuilder;
