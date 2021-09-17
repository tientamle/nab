// Product Model.
module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define('Product', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    slug: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING,
    }
  }, {
    underscored: true
  });

  return Products;
};
