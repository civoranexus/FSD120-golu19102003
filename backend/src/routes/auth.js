const express = require('express');
const authenticationRouter = express.Router();

authenticationRouter.post('/signin', (request, response) => {
  response.json({
    message: 'User authentication endpoint - pending implementation',
    requestData: request.body
  });
});

authenticationRouter.post('/signup', (request, response) => {
  response.json({
    message: 'User registration endpoint - pending implementation',
    requestData: request.body
  });
});

authenticationRouter.post('/signout', (request, response) => {
  response.json({
    message: 'Session termination endpoint - pending implementation'
  });
});

module.exports = authenticationRouter;
