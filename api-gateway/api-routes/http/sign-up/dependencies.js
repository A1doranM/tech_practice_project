const signUpService = require("../../../auth-logic/sign-up");
const HttpClient = require("../../../auth-logic/session/client");

module.exports = {
  console: console,
  signInService: signUpService,
  httpClient: HttpClient
}
