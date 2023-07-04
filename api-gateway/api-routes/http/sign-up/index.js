const signInService = signInSevice;

({
  signUp(email, password) {
    signInService.signIn(email, password)
  }
})
