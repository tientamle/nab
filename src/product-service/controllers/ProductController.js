// Product Controller
const response = require('../helpers/Response');
const translate = require('../helpers/Translator');
const ProductService = require('../services/ProductService');

class ProductController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.productService = new ProductService();
  }

  /**
   * Search products by variant attribute.
   */
  async searchProduct() {
    try {
      const results = await this.productService.findBy(this.req.query);
      this.res.status(200).json(response.data(this.req, results));
    } catch (err) {
      this.res.status(err.status || 500).json(response.error({
        message: translate(this.req, err.message || 'unknown'),
      }));
    }
  }

  /**
   * Get one product and product variants.
   */
  async getProductById() {
    try {
      const { params } = this.req;
      if (params.id === undefined) {
        throw Error('missing parameters');
      }

      const id = params.id;
      const product = await this.productService.getById(id);
      if (!product) {
        throw Error('product not found');
      }

      this.res.status(200).json(response.data(this.req, product));
    } catch (err) {
      this.res.status(err.status || 500).json(response.error({
        message: translate(this.req, err.message || 'unknown'),
      }));
    }
  }
}

module.exports = {
  searchProduct: (req, res) => {
    (new ProductController(req, res)).searchProduct();
  },
  getProductById: (req, res) => {
    (new ProductController(req, res)).getProductById();
  },
};
