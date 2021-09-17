/*global describe, expect, it, beforeAll */
const request = require('supertest');
const app = require('../../app');

describe('GET Product Endpoints', () => {
  // Clears the database and adds some testing data.
  beforeAll(async () => {
    const response = await request(app).get('/products/dump');
    expect(response.status).toBe(200);
  });

  it('Should response the product list', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('success');

    expect(response.body.data).toHaveProperty('items');
    expect(response.body.data).toHaveProperty('total');
    expect(response.body.data).toHaveProperty('paging');

    expect(response.body.data.paging).toBeDefined();
    expect(response.body.data.paging).toHaveProperty('offset');
    expect(response.body.data.paging).toHaveProperty('page');
    expect(response.body.data.paging).toHaveProperty('limit');
  });

  it('Should response the product list with pagging', async () => {
    const response = await request(app).get('/products?page=2&limit=5');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('success');

    expect(response.body.data).toHaveProperty('items');
    expect(response.body.data).toHaveProperty('total');
    expect(response.body.data).toHaveProperty('paging');

    expect(response.body.data.paging).toBeDefined();
    expect(response.body.data.paging).toHaveProperty('offset');
    expect(response.body.data.paging).toHaveProperty('page');
    expect(response.body.data.paging).toHaveProperty('limit');

    expect(response.body.data.paging.page).toBe(2);
    expect(response.body.data.paging.offset).toBe(5);
    expect(response.body.data.paging.limit).toBe(5);
  });

  // Search not found.
  it('Should response the product list is empty', async () => {
    const response = await request(app).get('/products?color=ZXY');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('success');

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBe(null);
  });

  // Search random.
  it('Should response the product list not empty', async () => {
    const response = await request(app).get('/products?color=A');
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('success');
  });

  it('Should response the product detail and variant', async () => {
    const productId = 1;
    const response = await request(app).get('/products/' + productId);
    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('success');
    expect(response.body.data).toHaveProperty('product');
    expect(response.body.data).toHaveProperty('variants');

    // Verify product format
    expect(response.body.data.product.id).toBeDefined();
    expect(response.body.data.product.id).toBe(productId);
    expect(response.body.data.product).toHaveProperty('name');
    expect(response.body.data.product).toHaveProperty('slug');
    expect(response.body.data.product).toHaveProperty('createdAt');

    // Verify variant format
    response.body.data.variants.map(variant => {
      expect(variant.productId).toBe(productId);
      expect(variant).toHaveProperty('name');
      expect(variant).toHaveProperty('sku');
      expect(variant).toHaveProperty('price');
      expect(variant).toHaveProperty('createdAt');
    });
  });

  it('Should response status 500 and product not found', async () => {
    const productId = 9999;
    const response = await request(app).get('/products/' + productId);
    expect(response.status).toBe(500);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('message');

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('product not found');
  });

});