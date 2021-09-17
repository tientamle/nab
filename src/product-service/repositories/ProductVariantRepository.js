// Product Variant Repository.
const { Op } = require('sequelize');
const models = require('../models');
const productVariantModel = models.ProductVariant;

class ProductVariantRepository {
  /**
   * Get Variant By Ids.
   */
  async getVariantByIds(productVariantIds, paging, order) {
    // Find by Attributes.
    let whereIn = {}; // Find All.
    if (productVariantIds) {
      whereIn = {
        id: {
          [Op.in]: productVariantIds
        }
      };
    }

    const productVariants = await productVariantModel.findAndCountAll({
      limit: paging.limit,
      offset: paging.offset,
      where: whereIn,
      order: [
        [order.orderBy, order.sortBy]
      ],
    });

    return productVariants;
  }

  /**
   * Get Variant By Product Id.
   */
  async getByProductId(productId) {
    const productVariants = await productVariantModel.findAll({
      where: {
        productId: productId
      },
    });

    return productVariants;
  }
}

module.exports = new ProductVariantRepository();
