const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const knex = require("../db/index");


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new donation

router.post('/', (req, res, next) => {
  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight,
    pictureUrl: req.body.pictureUrl
  };

  knex.insert(toInsert)
  .into("donations")
  .then(() => {
    res.json({success: true, message: "Thanks for posting!"})
  })
  .catch(() => {
    res.json({success: false, message: "Error: Missing parameters"})
  })
})

module.exports = router;
