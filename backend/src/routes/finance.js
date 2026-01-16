const express = require('express');
const financialManagementRouter = express.Router();

financialManagementRouter.get('/', (request, response) => {
  response.json({
    message: 'Financial management endpoint - pending implementation'
  });
});

module.exports = financialManagementRouter;
