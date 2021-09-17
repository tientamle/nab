// Product Repository.
const models = require('../models');
const productModel = models.Products;

class ProductRepository {
  /**
   * Find by Product Id.
   */
  getById(id) {
    return productModel.findByPk(id);
  }
}

module.exports = new ProductRepository();
