const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const knex = require("../db/index");
const GMAP = require("../frontend/app_keys/app_keys");
const { geoCode } = require("../api/googleAPI");
const methodOverride = require("method-override");
const myfuncs = require("./helpers");

// Get donations information from database

router.get("/", myfuncs.checkAuth, function(req, res) {
  const research = req.query.research;
  const radius = req.query.radius || "100";
  const user = res.locals.user;
  const userQuery = user ? {} : {};

  const usersGeocodePromise = knex
    .select()
    .from("users")
    .where(userQuery)
    .then(users =>
      Promise.all(
        users.map(user =>
          geoCode({ address: user.address }).then(
            res => res.json.results.shift().geometry.location
          )
        )
      )
    );

  const donationQuery = research ? ["title", "ILIKE", `%${research}%`] : [{}];

  const donationPromise = knex
    .select()
    .from("donations")
    .where(...donationQuery);

  Promise.all([donationPromise, usersGeocodePromise]).then(
    ([donations, usersGeocode]) => {
      res.render("donations", {
        donations,
        usersGeocode,
        GMAP_KEY: GMAP.GMAP_KEY
      });
    }
  );
});

// Create new donation

router.post("/", (req, res) => {
  let donationPic = req.files.donationPic;
  let donationPicName = donationPic.name;
  let creationDate = Date.now().toLocaleString();
  let createdAt = creationDate.replace(/\s*,/g, "_");
  const cleanName = donationPicName.replace(/\s/g, "_");
  donationPic.mv("./public/upload/" + createdAt + cleanName);

  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    pictureUrl: "/upload/" + createdAt + cleanName,
    user_id: res.locals.user.id
  };

  knex
    .insert(toInsert)
    .into("donations")
    .then(() => {
      res.redirect("donations");
    });
});

// Route to create

router.get("/new", function(req, res) {
  if (req.isAuthenticated() === true) {
    res.render("donations/new");
  } else {
    res.redirect("/login");
  }
});

// Route to delete donation
router.use(methodOverride("_method"));

router.post("/:id", function(req, res) {
  const donationId = req.params.id;
  knex("donations")
    .where({ id: donationId })
    .del()
    .then(() => {
      res.redirect("/donations");
    });
});

// Route to donation show page

router.get("/:id", function(req, res) {
  const donationId = req.params.id;
  const current_user = res.locals.user.id;
  knex
    .select()
    .from("donations")
    .where({ id: donationId })
    .then(([donationShow]) => {
      knex
        .select()
        .from("users")
        .where({ id: donationShow.user_id })
        .then(([data]) => {
          const user_data = data;
          res.render("donations/show", {
            current_user,
            user_data,
            donationShow,
            GMAP_KEY: GMAP.GMAP_KEY
          });
        });
    })
    .catch(() => {
      res.redirect("/");
    });
});

// Messages routes and controllers

router.post("/:id/messages", function(req, res) {
  const toInsert = {
    content: req.body.content,
    donation_id: req.params.id,
    user_id: res.locals.user.id
  };

  knex
    .insert(toInsert)
    .into("messages")
    .then(() => {
      res.redirect("/donations");
    });
});

// post for answers

router.post("/:id/messages/:id", function(req, res) {
  const toInsert = {
    content: req.body.answer,
    user_id: res.locals.user.id,
    message_id: req.params.id
  };

  const userId = res.locals.user.id;

  knex
    .insert(toInsert)
    .into("answers")
    .then(() => {
      res.redirect("/users/${userId}/donations");
    });
});

module.exports = router;
