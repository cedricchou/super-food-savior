const express = require('express');
const router = express.Router();
const passport = require('passport');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated())
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res) {
  if (!req.files) {
    return res.send('No files were uploaded');
  }
  let donationPic = req.files.donationPic;
  let donationPicName = donationPic.name;
  console.log(donationPicName);
  donationPic.mv('./public/upload/'+donationPicName, function(err) {
    if (err) {
      return res.send(err);
    } else {
      res.redirect('/donations');
    }
  })
})

module.exports = router;
