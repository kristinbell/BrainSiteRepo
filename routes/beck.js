var express = require('express');
var router = express.Router();

/* GET beck page. */
router.get('/', function(req, res, next) {
  res.render('beck');
});

/* POST beck results page. */
router.post('/', function(req, res, next) {
  res.render('beckresults');
});


module.exports = router;