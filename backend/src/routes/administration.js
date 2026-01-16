const express = require('express');
const administrativeControlRouter = express.Router();

administrativeControlRouter.get('/', (request, response) => {
  response.json({
    message: 'Administrative control endpoint - pending implementation'
  });
});

module.exports = administrativeControlRouter;
