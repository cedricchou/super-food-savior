const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const knex = require("../db/index");

// Get donations information from database

router.get('/', function(req, res, next) {
  knex
  .select()
  .from('donations')
  .then(donation => {
    res.render('donations',
    {
      donation: donation
    });
  });
})

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

// Route to create

router.get('/new', function(req, res, next) {
  res.render('donations/new');
});


module.exports = router;
