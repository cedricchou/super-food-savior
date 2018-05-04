const express = require('express');
const router = express.Router();
const User = require('../models/user');
const knex = require("../db/index");
const passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Create a new User

router.post('/', function(req, res) {

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
    .then((user) => {
      req.login(user, (err) => {
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

// Edit user



// Route to user creation page

router.get('/new', function(req, res) {
  res.render('users/new');
});

// passport serializer

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  knex
  .select()
  .from("users")
  .where({ id })
  .first()
  .then((user) => {
     done(null, user)
  })
});

module.exports = router;
