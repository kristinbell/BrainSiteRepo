var express = require('express');
var fetch = require("node-fetch");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('depression');
});

router.get('/get/:type', function(req, res) {
  
  if (req.params.type == "cute") {
    var url = `https://api.imgur.com/3/gallery/r/aww/top/week/1`
  } else if (req.params.type == "memes") {
    var url = `https://api.imgur.com/3/gallery/r/memes/top/week/1`
  } else {
    res.status(err.status || 500);
    res.render('error');
  }

  fetch(url, {headers: {Authorization: `Client-ID ${process.env.IMGUR_API_CLIENT}`}})
    .then(res => res.json())
    .then(json => res.send(json))
})

module.exports = router;