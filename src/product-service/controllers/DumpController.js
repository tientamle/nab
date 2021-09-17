// Import Dump Data Controller
const response = require('../helpers/Response');
const translate = require('../helpers/Translator');

const models = require('../models');
const attributeModel = models.Attributes;
const productModel = models.Products;
const productVariantModel = models.ProductVariant;
const productAttributeModel = models.ProductAttribute;

// This controller only use to dump some random test data.
class DumpController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.attributes = ['color', 'branch', 'size', 'weight', 'length'];
  }

  // Dump demo product data
  async dumpProduct() {
    try {
      // Add Attribute.
      this.dumpAttribute();

      // Drop current tables.
      await productModel.destroy({ truncate: true, cascade: false });
      await productVariantModel.destroy({ truncate: true, cascade: false });
      await productAttributeModel.destroy({ truncate: true, cascade: false });

      // Dump Product Variant and Attribute.
      this.dumpProducts();
      this.res.status(200).json(response.data(this.req, 'done'));

    } catch (err) {
      this.res.status(err.status || 500).json(response.error({
        message: translate(this.req, err.message || 'unknown'),
      }));
    }
  }

  // Dump Product and Product Variants
  async dumpProducts() {
    let index = 65; // from A - 65
    const indexMax = 90; // to Z - 90
    for (index; index <= indexMax; index++) {
      const product = await productModel.create({
        name: 'Product ' + String.fromCharCode(index),
        slug: 'product' + String.fromCharCode(index) + index,
      });

      await this.createProductVariant(product);
    }
  }

  // Create Variant for Product.
  async createProductVariant(product) {
    let index = 97; // from a - 97
    const indexMax = 106; // to j - 106
    for (index; index <= indexMax; index++) {
      const productVariant = await productVariantModel.create({
        productId: product.id,
        name: product.name + String.fromCharCode(index),
        sku: product.slug + index,
        price: index
      });

      this.createVariantAttribute(productVariant);
    }
  }

  // Create Variant Attribute.
  async createVariantAttribute(productVariant) {
    // A - Z
    function getRndValue() {
      const min = 65, max = 90;
      const random = Math.floor(Math.random() * (max - min)) + min;
      return String.fromCharCode(random);
    }

    this.attributes.map(async attr => {
      await productAttributeModel.create({
        productId: productVariant.productId,
        productVariantId: productVariant.id,
        attributeCode: attr,
        attributeValue: getRndValue(),
      });
    });
  }

  // Dump Attribute Data
  dumpAttribute() {
    this.attributes.map(async attr => {
      const attrItem = await attributeModel.findOne({
        where: {
          code: attr
        }
      });

      if (!attrItem) {
        await attributeModel.create({
          code: attr,
          name: attr.charAt(0).toUpperCase() + attr.slice(1),
        });
      }
    });
  }
}

module.exports = {
  dumpProduct: (req, res) => {
    (new DumpController(req, res)).dumpProduct();
  },
};
