var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Activity - Event Bus Service');
});

module.exports = router;