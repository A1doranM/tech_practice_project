const signInService = require("../../../auth-logic/sign-in");
const HttpClient = require("../../../auth-logic/session/client");

module.exports = {
  console: console,
  signInService: signInService,
  httpClient: HttpClient
}
