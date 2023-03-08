const express = require('express');
const validator = require('../middlewares/validatorMiddleware');
const userController = require('../controllers/users.controller');
const tokenValidateController = require('../controllers/tokenValidation.controller');

const router = express.Router();

router
  .post('/users', validator.bodyValidator, userController.createUser)
  .post('/login', userController.loginUser)
  .post('/token/validate', tokenValidateController.verifyToken);
module.exports = router;
