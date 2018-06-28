const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const knex = require("../db/index");
const methodOverride = require("method-override");
const myfuncs = require("./helpers");
const GMAP = require("../frontend/app_keys/app_keys");

// Get donations information from database

router.get("/", myfuncs.checkAuth, function(req, res) {
  const research = req.query.research;
  if (research === undefined) {
    knex
      .select()
      .from("donations")
      .then(donations => {
        knex
          .select()
          .from("users")
          .where({ id: res.locals.user.id })
          .then(user => {
            res.json({ donations, user });
          });
      });
  } else if (research) {
    knex
      .select()
      .from("donations")
      .where("title", "ILIKE", `%${research}%`)
      .then(donations => {
        knex
          .select()
          .from("users")
          .where({ id: res.locals.user.id })
          .then(user => {
            res.json({ donations, user, GMAP_KEY: GMAP.GMAP_KEY });
          });
      });
  }
});

// Create new donation

router.post("/", (req, res) => {
  let donationPic = req.files.picture;
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
      res.json({
        success: true,
        message: "Thank you for posting!"
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error: missing parameters"
      });
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
      res.json({
        success: true,
        message: "Thank you for posting!"
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error: missing parameters"
      });
    });
});

// Route to donation show page

router.get("/:id", function(req, res) {
  const donationId = req.params.id;
  const current_user = res.locals.user.id;
  const current_user_data = res.locals.user;
  knex
    .select()
    .from("donations")
    .where({ id: donationId })
    .then(([donationShow]) => {
      const previous = Date.parse(donationShow.createdAt);
      const current = Date.now();

      const timeAgo = timeDifference(current, previous);

      knex
        .select()
        .from("users")
        .where({ id: donationShow.user_id })
        .then(([data]) => {
          const user_data = data;
          res.json({
            timeAgo,
            current_user,
            user_data,
            donationShow,
            current_user_data,
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
      res.json({
        success: true,
        message: "Thank you for posting!"
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error: missing parameters"
      });
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

// function to display creation time

function timeDifference(current, previous, arr) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

// function to get the creation time of an array

function creationTime(arr) {
  let timeElapsed = [];
  for (let i = 0; i < arr.length; i++) {
    timeElapsed.push(Date.parse(arr[i].createdAt));
  }
  return timeElapsed;
}

module.exports = router;
