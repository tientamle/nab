// Profiler Service.
const models = require('../models');
const activityProfilerModel = models.ActivityProfiler;

class ProfilerService {
  /**
   * Save Product Activity to Database.
   */
  createActivity(req) {
    const body = req.body;
    const activity = {
      ip: body.ip,
      host: body.host,
      url: body.url,
      path: body.path,
      method: body.method,
      request: JSON.stringify(body.query),
    };

    activityProfilerModel.create(activity);
  }
}

module.exports = ProfilerService;
