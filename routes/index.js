const express = require("express");
const router = express.Router();
const passport = require("passport");
const GMAP = require("../frontend/app_keys/app_keys");
const fileUpload = require("express-fileupload");
const knex = require("../db/index");
const { geoCode } = require("../api/googleAPI");

router.use(fileUpload());

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* test */

module.exports = router;
