var express = require('express');
var router = express.Router();

const Message = require('../models/message.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    console.log(req.user);
    res.render('loneliness', {user: req.user.username});
  }
  res.render('loneliness', {user: false});
});

router.post('/post', function(req, res) {
  
  var message = new Message({
    username: req.body.name,
    body: req.body.textbody,
    datetime_of_post: new Date()
  });

  message
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err))
});

router.get('/get', function(req, res) {
  Message.find()
    .exec()
    .then(messages => {
      res.send(messages);
    })
    .catch(err => console.log(err))
});

router.delete("/:messageId", function(req, res) {
  const id = req.params.messageId;

  Message.deleteOne({ _id: id})
    .exec()
    .then(result => res.send(result))
    .catch(err => console.log(err))
});

module.exports = router;