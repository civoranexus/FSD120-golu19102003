const express = require('express');
const visitorManagementRouter = express.Router();

visitorManagementRouter.get('/', (request, response) => {
  response.json({
    message: 'Visitor management endpoint - pending implementation'
  });
});

module.exports = visitorManagementRouter;
