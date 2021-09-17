// Product Variant Model
module.exports = (sequelize, Sequelize) => {
  const ProductVariant = sequelize.define('ProductVariant', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    sku: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING(32),
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2),
    }
  }, {
    underscored: true,
    indexes: [{ unique: false, fields: ['product_id'] }, { fields: ['name'] }, { fields: ['price'] }]
  });

  return ProductVariant;
};
