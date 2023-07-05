"use strict";

const fs = require("node:fs");
const http2 = require("node:http2");
const RouteBuilder = require("./api-routes/route-builder");

const types = {
  object: JSON.stringify,
  string: (s) => s,
  undefined: () => "not found",
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

const key = fs.readFileSync("./utils/cert/privateKey.key");
const cert = fs.readFileSync("./utils/cert/certificate.crt");

const options = { key, cert };
const routesBuilder = new RouteBuilder();

const server = http2.createSecureServer(options, async (req, res) => {
  const routing = await routesBuilder.getHTTPRoutes();
  const data = routing[req.url];
  const type = typeof data;
  const serializer = types[type];
  const result = serializer(data, req, res);
  res.end(result);
});

server.listen(8080);
console.log("Open: https://127.0.0.1:8080", RouteBuilder);
