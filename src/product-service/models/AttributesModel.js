// Attribute Model.
module.exports = (sequelize, Sequelize) => {
  const Attributes = sequelize.define('Attribute', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    code: {
      unique: true,
      type: Sequelize.STRING(32)
    },
    name: {
      type: Sequelize.STRING
    }
  }, {
    underscored: true
  });

  return Attributes;
};
