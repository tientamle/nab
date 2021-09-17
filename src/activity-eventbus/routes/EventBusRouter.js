var express = require('express');
var router = express.Router();

const { publish, registry } = require('../services/EventBusService');

// Emit event
router.post('/publish', publish);

// Listen for event
router.post('/registry', registry);

module.exports = router;
