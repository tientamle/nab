// Pagination
const getPagination = (page, size) => {
  page = Math.abs(page);
  size = Math.abs(size);
  page = page ? page : 1;
  const limit = size ? +size : 10;
  const offset = page ? (page * limit) - limit : 0;

  return {limit, offset, page};
};

// General sort can sort by Mysql. Other sort needs to sort in code.
const sqlSupported = ['name', 'sku', 'price', 'created_at', 'updated_at'];
const getOrderBy = (orderBy, sortBy) => {
  // Sort Price by Default.
  if (sqlSupported.indexOf(orderBy) == -1) {
    orderBy = 'price';
  }
  if (['ASC', 'DESC'].indexOf(sortBy) == -1) {
    sortBy = 'DESC';
  }

  return {
    orderBy: orderBy ? orderBy : 'price',
    sortBy: sortBy ? sortBy : 'DESC',
  };
};

module.exports = {
  getOrderBy,
  getPagination,
};