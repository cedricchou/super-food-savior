const express = require("express");
const router = express.Router();
const passport = require("passport");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

/* GET home page. */

router.get("/", function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("index", { title: "Express" });
});

module.exports = router;
