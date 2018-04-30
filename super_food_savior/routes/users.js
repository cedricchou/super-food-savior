const express = require('express');
const router = express.Router();
const User = require('../models/user');
const knex = require("../db/index");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create a new User

router.post('/', function(req, res, next) {
  const toInsert = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  };

  knex.insert(toInsert)
  .into("users")
  .then(() => {
    res.redirect('/')
  })

  /*
  knex
  .insert(toInsert)
  .into("users")
  .then(() => {
    res.json({success: true,
              message: 'User created!'})
  })
  .catch(() => {
    res.json({success: false,
              message: 'Missing parameters or already existing email'})
  })
  */
})

// Route to user creation page

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

module.exports = router;
