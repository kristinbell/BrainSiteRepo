var express = require('express');
var router = express.Router();

/* GET beck results page. */
router.get('/', function(req, res, next) {
  res.render('beckresults');
});

/* POST beck results page. */
router.post('/', function(req, res, next) {
  res.render('beckresults');
});


module.exports = router;