const express = require("express");
const router = express.Router();
const knex = require("../db/index");
const passport = require("passport");
const myfuncs = require("./helpers");
const googleMaps = require("@google/maps");
const GMAP = require("../frontend/app_keys/app_keys");
const { geoCode } = require("../api/googleAPI");
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
    const address = req.body.address;

    geoCode({ address }).then(addressRes => {
      const coords = addressRes.json.results[0].geometry.location;
      bcrypt.hash(password, saltRounds, function(err, hash) {
        knex
          .returning("id")
          .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            password: hash,
            latitude: coords.lat,
            longitude: coords.lng
          })
          .into("users")
          .then(([data]) => {
            const user = {
              id: data
            };
            req.login(user, err => {
              res.json({
                success: true,
                message: "Thanks for signing up!"
              });
            });
          })
          .catch(() => {
            res.json({
              success: true,
              message: "Thanks for signing up!"
            });
          });
      });
    });
  },
  passport.authenticate("local", {
    successRedirect: "/donations",
    failureRedirect: "/users/new"
  })
);

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
      res.json({ myMessages });
    })
    .catch(res => {
      res.json({
        message: "Could not fetch data"
      });
    });
});

// Answers to my messages panel

router.get("/:id/messages/:id", myfuncs.checkAuth, function(req, res) {
  const message_id = req.params.id;
  const userId = res.locals.user.id;
  knex
    .select()
    .from("messages")
    .where({ id: message_id })
    .then(([message]) => {
      knex
        .select()
        .from("answers")
        .where({ message_id })
        .then(answers => {
          res.json({ answers, message, userId });
        })
        .catch(res => {
          res.json({
            message: "Could not access data"
          })
        });
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
      res.json({ myDonations });
    })
    .catch(res => {
      res.json({
        message: "Could not fetch the data"
      });
    });
});

// messages of donations panel

router.get("/:id/donations/:id/", myfuncs.checkAuth, function(req, res) {
  const donation_id = req.params.id;
  const userId = res.locals.user.id;
  knex
    .select()
    .from("messages")
    .where({ donation_id })
    .then(allMessages => {
      res.json({ allMessages, userId });
    })
    .catch(res => {
      res.json({
        message: "Could not access the data"
      });
    });
});

// answers to messages

router.get("/:id/donations/:id/messages/:id", function(req, res) {
  const message_id = req.params.id;
  knex
    .select()
    .from("messages")
    .where({ id: message_id })
    .then(([message]) => {
      knex
        .select()
        .from("answers")
        .where({ message_id })
        .then(answers => {
          res.render("donations/answers", { answers, message });
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
