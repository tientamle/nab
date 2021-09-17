/*global process */
/**
 * External Service Configuration.
 */
const services = {
  activityEventbus: process.env.ACTIVITY_EVENTBUS_SERVICE || null,
};

module.exports = services;
