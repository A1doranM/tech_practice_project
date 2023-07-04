const signInController = require("../../auth-logic/sign-in")

const signIn = (email, password) => {
  signInController(email, password)
}
