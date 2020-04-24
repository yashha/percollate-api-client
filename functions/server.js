'use strict';
const serverless = require('serverless-http');
const app = require('../__sapper__/build/server/server');

module.exports = app;
module.exports.handler = serverless(app);
