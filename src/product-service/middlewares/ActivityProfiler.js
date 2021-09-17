// Activity Profiler
const axios = require('axios').default;
const config = require('../configs/services');

const activityProfiler = (req, res, next) => {
  if (!config.activityEventbus) {
    return next();
  }

  const message = {
    url: req.url,
    method: req.method,
    query: req.query,
    body: req.body,
    path: req.path,
    host: req.hostname,
    ip: req.ip,
  };

  sendActivity(config.activityEventbus, message);

  return next();
};

// Send Activity Profiler
const sendActivity = (url, message) => {
  axios.post(url, message).then(function (response) {
    console.log('Send Activity: ', url, response.status);
  }).catch(function (error) {
    console.error('Send Activity Error: ', url, error.message);
  });
};

module.exports = activityProfiler;
