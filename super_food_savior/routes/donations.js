const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const knex = require("../db/index");
const GMAP = require("../frontend/app_keys/app_keys");
const { geoCode } = require("../api/googleAPI");

// Get donations information from database

router.get("/", function(req, res) {
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
  let createdAt = Date.now().toLocaleString();
  const cleanName = donationPicName.replace(/\s/g, "_");
  donationPic.mv("./public/upload/" + donationPicName + createdAt);

  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight ? req.body.weight : 0,
    pictureUrl: "/upload/" + donationPicName + createdAt,
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

// Route to Edit donation

router.get("/edit", function(req, res) {
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
      res.render("donations/edit", {
        donations,
        usersGeocode,
        GMAP_KEY: GMAP.GMAP_KEY
      });
    }
  );
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
          console.log(user_data);
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

module.exports = router;
