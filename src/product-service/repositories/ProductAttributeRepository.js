// Product Attribute Repository.
const models = require('../models');
const attributeModel = models.Attributes;
const productAttributeModel = models.ProductAttribute;

class ProductAttributeRepository {
  /**
   * Filter Product Variants By Atrribute.
   */
  async getVariantIdByAttribute(query) {
    // Get Available Attribute Code.
    const allAttribute = await attributeModel.findAll();
    if (!allAttribute) {
      // Filter not available, show all products.
      return null;
    }

    let attrCodes = [];
    allAttribute.map(attribute => {
      attrCodes.push(attribute.code);
    });

    // Filter Conditions.
    const filters = [];
    Object.keys(query).map((key) => {
      if (attrCodes.indexOf(key) >= 0) {
        filters.push({
          attributeCode: key,
          attributeValue: query[key],
        });
      }
    });

    // Don't have any filter applied, show all products.
    if (!filters.length) {
      return null;
    }

    // Find with Conditions.
    let collectVariantIds = [];
    let variantIds = null;
    await Promise.all(filters.map(async (filter) => {
      variantIds = await this.findVariantByAttribute(filter);
      if (variantIds && variantIds.length) {
        collectVariantIds = [...collectVariantIds, ...variantIds];
      }
    }));

    // Unique Variant IDs.
    return [...new Set(collectVariantIds)];
  }

  /**
   * Find Variant Ids by attribute code/values.
   */
  async findVariantByAttribute(filters) {
    const results = await productAttributeModel.findAll({
      attributes: ['productVariantId'],
      where: filters
    });

    if (!results) {
      return null;
    }

    let variantIds = [];
    results.map(productAttribute => {
      variantIds.push(productAttribute.productVariantId);
    });

    return variantIds;
  }
}

module.exports = new ProductAttributeRepository();
