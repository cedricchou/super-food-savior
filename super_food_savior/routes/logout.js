const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ending session

router.get('/', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
