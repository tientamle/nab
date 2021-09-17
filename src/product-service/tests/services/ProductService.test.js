/*global describe, expect, it */
const ProductService = require('../../services/ProductService');

describe('GET Product from Service', () => {
  // Clears the database and adds some testing data.
  it('Should response the product detail and variant', async () => {
    const productId = 1;
    var productService = new ProductService();
    const results = await productService.getById(1);

    expect(results).toHaveProperty('product');
    expect(results).toHaveProperty('variants');

    // Verify product format
    expect(results.product.id).toBeDefined();
    expect(results.product.id).toBe(productId);
    expect(results.product).toHaveProperty('name');
    expect(results.product).toHaveProperty('slug');
    expect(results.product).toHaveProperty('createdAt');

    // Verify variant format
    results.variants.map(variant => {
      expect(variant.productId).toBe(productId);
      expect(variant).toHaveProperty('name');
      expect(variant).toHaveProperty('sku');
      expect(variant).toHaveProperty('price');
      expect(variant).toHaveProperty('createdAt');
    });
  });

  it('Should response null', async () => {
    const productId = 9999;
    var productService = new ProductService();
    const results = await productService.getById(productId);

    expect(results).toBe(null);
  });
});