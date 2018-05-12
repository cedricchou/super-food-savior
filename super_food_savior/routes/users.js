const express = require("express");
const router = express.Router();
const User = require("../models/user");
const knex = require("../db/index");
const passport = require("passport");
const myfuncs = require("./helpers");

const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */

router.get("/", function(req, res) {
  res.send("I am the user page");
});

// Create a new User

router.post(
  "/",
  function(req, res) {
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
      knex
        .returning("id")
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          address: req.body.address,
          password: hash
        })
        .into("users")
        .then(([data]) => {
          const user = {
            id: data
          };
          req.login(user, err => {
            console.log(err);
            res.redirect("/");
          });
        });
    });
  },
  passport.authenticate("local", {
    successRedirect: "/donations",
    failureRedirect: "/users/new"
  })
);

// Edit user

// Route to user creation page

router.get("/new", function(req, res) {
  res.render("users/new");
});

// My messages panel

router.get("/:id/messages", myfuncs.checkAuth, function(req, res) {
  const user_id = res.locals.user.id;

  knex
    .select()
    .from("messages")
    .where({ user_id })
    .then(myMessages => {
      res.render("users/messages", { myMessages });
    });
});

// My donations panel

router.get("/:id/donations", myfuncs.checkAuth, function(req, res) {
  const user_id = res.locals.user.id;

  knex
    .select()
    .from("donations")
    .where({ user_id })
    .then(myDonations => {
      res.render("users/donations", { myDonations });
    });
});

// messages of donations panel

router.get("/:id/donations/:id/messages", myfuncs.checkAuth, function(
  req,
  res
) {
  const donation_id = req.params.id;

  knex
    .select()
    .from("donations")
    .where({ id: donation_id })
    .then(([donation]) => {
      knex
        .select()
        .from("messages")
        .where({ donation_id })
        .then(allMessages => {
          res.render("donations/messages", { allMessages, donation });
        });
    });
});

// passport serializer

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  knex
    .select()
    .from("users")
    .where({ id })
    .first()
    .then(user => {
      done(null, user);
    });
});

module.exports = router;
