const express = require('express');
const router = express.Router();
const passport = require('passport');

// login page

router.get('/', function(req, res, next) {
  res.render('login/new');
});

router.post('/', passport.authenticate(
  'local', {
    successRedirect: '/donations',
    failureRedirect: '/login'
  }
));

module.exports = router;
