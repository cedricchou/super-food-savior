const myfuncs = {
  checkAuth: (req, res, next) => {
    if (!req.isAuthenticated()){
      res.redirect("/login");
      return;
    }
    next();
  }
}

module.exports = myfuncs;
