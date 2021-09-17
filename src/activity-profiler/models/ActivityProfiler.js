// Activity Profiler Model.
module.exports = (sequelize, Sequelize) => {
  const ActivityProfiler = sequelize.define('ActivityProfiler', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    ip: {
      type: Sequelize.STRING(32)
    },
    host: {
      type: Sequelize.STRING(32)
    },
    url: {
      type: Sequelize.STRING(2048)
    },
    path: {
      type: Sequelize.STRING(1024)
    },
    method: {
      type: Sequelize.STRING(32)
    },
    request: {
      type: Sequelize.TEXT
    }
  }, {
    underscored: true
  });

  return ActivityProfiler;
};