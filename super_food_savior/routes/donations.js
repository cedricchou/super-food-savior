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
      res.render('donations', { donation });
    });
  } else if(research) {
    knex
    .select()
    .from('donations')
    .where("title", "ILIKE", `%${research}%`)
    .then(donation => {
      res.render('donations', { donation });
    });
  }
})

// Create new donation

router.post('/', (req, res) => {
  // console.log(res.locals.user.id)

  let donationPic = req.files.donationPic;
  let donationPicName = donationPic.name;
  let createdAt = Date.now().toLocaleString();
  const cleanName = donationPicName.replace(/\s/g, "_");
  donationPic.mv('./public/upload/' + donationPicName + createdAt)

  const toInsert = {
    title: req.body.title,
    description: req.body.description,
    weight: req.body.weight ? req.body.weight : 0,
    pictureUrl: "/upload/" + donationPicName + createdAt,
    user_id: res.locals.user.id
  };

  knex.insert(toInsert)
  .into("donations")
  .then(() => {
    res.redirect('donations')
  })
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

router.get('/:id', function(req, res) {
  const donationId = req.params.id;
  knex
  .select()
  .from('donations')
  .where({id: donationId})
  .then(([donationShow]) => {
    knex
    .select()
    .from('users')
    .where({id: donationShow.user_id})
    .then(([data]) => {
      const user_data = data;
      res.render('donations/show', { user_data, donationShow })
    })
  }).catch(() => {
    res.redirect('/')
  })
})

// Messages routes and controllers

router.post('/:id/messages', function(req, res) {
  const toInsert = {
    content: req.body.content,
    donation_id: req.params.id,
    user_id: res.locals.user.id
  };

  knex
  .insert(toInsert)
  .into('messages')
  .then(() => {
    res.redirect('/donations')
  })
})

module.exports = router;
