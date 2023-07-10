const fs = require("node:fs").promises;
const vm = require("node:vm");
const path = require("node:path");
const signInService = require("../auth-logic/sign-in");

class RouteBuilder {
  #sandbox;
  #RUN_OPTIONS;

  constructor() {
    this.#RUN_OPTIONS = {timeout: 5000, displayErrors: false};
  }

  async #load(scriptCode, scriptDependencies) {

    const code = `"use strict";\n${scriptCode}`;
    const script = new vm.Script(code);
    const context = vm.createContext(Object.freeze({...scriptDependencies}));
    const exported = script.runInContext(context, this.#RUN_OPTIONS);

    return exported;
  }

  async #getRoutes(method) {
    const routesDir = await fs.readdir(path.join(__dirname, method));

    const routes = {};

    for (const route of routesDir) {
      const routeController = await fs.readFile(path.join(__dirname, method, route, "index.js"));
      const dependencies = require(path.join(__dirname, method, route, "dependencies.js"));

      routes[route] = await this.#load(routeController, dependencies);
    }

    console.log("Routes: ", routes);

    return routes;
  }

  async getHTTPRoutes() {
   return await this.#getRoutes("http");
  }
}

module.exports = RouteBuilder;
