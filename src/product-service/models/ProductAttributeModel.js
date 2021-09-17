// Product Attribute Model.
module.exports = (sequelize, Sequelize) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    productVariantId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    attributeCode: {
      allowNull: false,
      type: Sequelize.STRING(32),
    },
    attributeValue: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }, {
    underscored: true,
    indexes: [{ fields: ['product_id'] }, { fields: ['product_variant_id'] }, { fields: ['attribute_code', 'attribute_value'] }]
  });

  return ProductAttribute;
};
