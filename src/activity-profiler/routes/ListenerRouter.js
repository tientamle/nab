// Product Routers.
var express = require('express');

const { listenActivity } = require('../controllers/ListenerController');

const productRouter = () => {
  const router = express.Router();

  // Save Activity
  router.all('/', listenActivity);

  // catch 404
  router.use((req, res) => {
    res.status(404).json({
      message: 'NotFound',
    });
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message || 'unknown',
    });
  });

  return router;
};

module.exports = productRouter();
