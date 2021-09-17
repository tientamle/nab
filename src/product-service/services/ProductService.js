// Product Services.
const { getOrderBy, getPagination } = require('../helpers/Pagination');
const productRepository = require('../repositories/ProductRepository');
const productAttributeRepository = require('../repositories/ProductAttributeRepository');
const productVariantRepository = require('../repositories/ProductVariantRepository');

class ProductService {
  /**
   * Get Product By Product Id.
   */
  async getById(id) {
    const product = await productRepository.getById(id);
    if (!product) {
      return null;
    }

    // Get Product Variants
    const variants = await productVariantRepository.getByProductId(product.id);

    return {
      product,
      variants,
    };
  }

  /**
   * Search products by variant attribute.
   */
  async findBy(query) {
    // VariantIds match query conditions.
    const productVariantIds = await productAttributeRepository.getVariantIdByAttribute(query);
    if (productVariantIds !== null && !productVariantIds.length) {
      return null;
    }

    // Get limit, offset.
    const paging = getPagination(query.page, query.limit);

    // Sort by Price by Default.
    const order = getOrderBy(query.order, query.sort);

    // Get Variant Items and Sort.
    const productVariants = await productVariantRepository.getVariantByIds(productVariantIds, paging, order);

    return {
      paging,
      total: productVariants.count,
      items: productVariants.rows,
    };
  }
}

module.exports = ProductService;
