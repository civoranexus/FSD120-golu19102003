const express = require('express');
const communicationHubRouter = express.Router();

communicationHubRouter.get('/', (request, response) => {
  response.json({
    message: 'Communication hub endpoint - pending implementation'
  });
});

module.exports = communicationHubRouter;
