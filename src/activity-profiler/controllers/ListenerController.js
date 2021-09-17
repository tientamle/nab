// Listener Controller
const ProfilerService = require('../services/ProfilerService');

class ListenerController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.profilerService = new ProfilerService();
  }

  /**
   * Activity Listener
   */
  listenActivity() {
    try {
      this.profilerService.createActivity(this.req);
      this.res.status(200).json({ message: 'ok'});
    } catch (err) {
      this.res.status(err.status || 500).json({
        message: err.message || 'unknown',
      });
    }
  }
}

module.exports = {
  listenActivity: (req, res) => {
    (new ListenerController(req, res)).listenActivity();
  },
};
