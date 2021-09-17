// Product Routers.
var express = require('express');

const response = require('../helpers/Response');
const translate = require('../helpers/Translator');

const { dumpProduct } = require('../controllers/DumpController');
const { searchProduct, getProductById } = require('../controllers/ProductController');

const productRouter = () => {
  const router = express.Router();

  // Product Listing
  router.all('/', searchProduct);

  // Dump Product Data for Text.
  router.all('/dump', dumpProduct);

  // Get by Product Id
  router.all('/:id', getProductById);

  // catch 404
  router.use((req, res) => {
    res.status(404).json(response.error({
      message: `${translate(req, 'NotFound')}: ${req.originalUrl}`,
    }));
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    res.status(err.status || 500).json(response.error({
      message: translate(req, err.message || 'unknown'),
    }));
  });

  return router;
};

module.exports = productRouter();
