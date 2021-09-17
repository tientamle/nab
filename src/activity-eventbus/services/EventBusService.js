// EventBus Service.
const axios = require('axios').default;

let message = [];
let observers = [];

const activityProfilerService = process.env.ACTIVITY_PROFILER_SERVICE || '';
if (activityProfilerService) {
  observers.push(activityProfilerService);
}

class EventBusService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  // Emit event.
  publish() {
    try {
      // Add to message.
      message.push(this.req.body);

      // Dispatch message.
      this.dispatch();
      this.res.status(200).json({ message: 'ok' });
    } catch (err) {
      this.res.status(err.status || 500).json({
        message: err.message || 'unknown',
      });
    }
  }

  // Listen for event.
  registry() {
    try {
      if (this.req.body.register && observers.indexOf(this.req.body.register)) {
        observers.push(this.req.body.register);
      }

      // Dispatch message if any.
      this.dispatch();
      this.res.status(200).json({ message: 'ok' });
    } catch (err) {
      this.res.status(err.status || 500).json({
        message: err.message || 'unknown',
      });
    }
  }

  // Dispatch message
  dispatch() {
    if (!message.length || !observers.length) {
      return false;
    }

    const msg = message.shift();
    observers.map(url => {
      this.notify(url, msg);
    });

    // Repeat until queue empty.
    if (message.length) {
      this.dispatch();
    }
  }

  // Send Notify
  notify(url, message) {
    axios.post(url, message).then(function (response) {
      console.log('Send Activity: ', url, response.status);
    }).catch(function (error) {
      console.error('Send Activity Error: ', url, error.message);
    });
  }
}

module.exports = {
  publish: (req, res) => {
    (new EventBusService(req, res)).publish();
  },
  registry: (req, res) => {
    (new EventBusService(req, res)).registry();
  },
};
