// Setup Test Environment.
require('dotenv').config({ path: './tests/.env.test' });
const model = require('../models');

model.sequelize.options.logging = false;
model.sequelize.sync({});
