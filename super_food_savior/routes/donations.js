const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const knex = require("../db/index");

// Get donations information from database

router.get('/', function(req, res) {
  const research = req.query.research;
  console.log(research);
  if(research === undefined) {
    knex
    .select()
    .from('donations')
    .then(donation => {
      res.render('donations',
      {
        donation: donation
      });
    });
  } else if(research) {
    knex
    .select()
    .from('donations')
    .where("title", "ILIKE", `%${research}%`)
    .then(donation => {
      res.render('donations',
      {
        donation: donation
      });
    });
  }
})

// Create new donation

router.post('/', (req, res) => {
  console.log(res.locals.user.id)
  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight ? req.body.weight : 0,
    pictureUrl: req.body.pictureUrl,
    user_id: res.locals.user.id
  };

  knex.insert(toInsert)
  .into("donations")
  .then(() => {
    res.redirect('donations')
  })

  /*
  knex.insert(toInsert)
  .into("donations")
  .then(() => {
    res.json({success: true, message: "Thanks for posting!"})
  })
  .catch(() => {
    res.json({success: false, message: "Error: Missing parameters"})
  })
  */
})

// Route to create

router.get('/new', function(req, res) {
  if(req.isAuthenticated() === true) {
    res.render('donations/new');
  } else {
    res.redirect('/login');
  }
});

// Route to Edit donation

router.get('/edit', function(req, res) {
  res.render('donations/edit')
})

// Route to donation show page




module.exports = router;
