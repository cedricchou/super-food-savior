const express = require('express');
const router = express.Router();
const User = require('../models/user');
const knex = require("../db/index");
const passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create a new User

router.post('/', function(req, res, next) {

  const password = req.body.password

  bcrypt.hash(password, saltRounds, function(err, hash) {
    knex
    .returning('id')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      address: req.body.address,
      password: hash
    })
    .into("users")
    .then((user_id) => {
      console.log(typeof user_id)
      req.login(user_id, (err) => {
        console.log(err)
        res.redirect('/')
      })
    })
  });


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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user_id, done) {
  // knex
  // .select()
  // .from("users")
  // .where({id: user_id[0]})
  // .then((user) => {
     done(null, user_id)
  // })
});

module.exports = router;
