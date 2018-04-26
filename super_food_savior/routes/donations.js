// import Donation from '../models/donation';
const express = require('express');
const router = express.Router();
const Donation = require('../models/donation')
const knex = require("../db/index");


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new donation

router.post('/', (req, res, next) => {
  console.log("++++++++++++++++++++ here");
  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight,
    pictureUrl: req.body.pictureUrl
  };

  console.log("toInsert >>> ", toInsert);

  knex.insert(toInsert)
  .into("donations")
  // .then(() => {
  //   res.redirect('/')
  // })
  .then(() => {
    res.json({success: true, message: "it works"})
  })
  .catch(() => {
    res.json({success: false, message: "it did NOT work"})
  })
})

module.exports = router;

// AXIOS - library for React
