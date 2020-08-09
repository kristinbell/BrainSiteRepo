var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require('../models/user.js');

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(error) {
            console.log("Error: " + error);
        } else if (!user) {
            res.send("failure");
        } else {
            req.login(user, function(err) {
                if (err) { return next(err); }
                res.send("success");
              });
        }
    })(req, res, next);
});

router.post('/logout', function(req, res, next) {
    req.logout();
    res.send("success");
});

module.exports = router;