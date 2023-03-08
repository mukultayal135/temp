const schemas = require('../schemas/schemas');

const bodyValidator = (req, res, next) => {
  const { error } = schemas.userSchema.validate(req.body);

  if (error) res.status(400).json({ message: error.message });
  else {
    next();
  }
};
const authValidator = (req, res, next) => {
  const { error } = schemas.authSchema.validate(req.headers);
  if (error) {
    res.status(400).json({ message: 'Token not found' });
  } else {
    next();
  }
};
module.exports = { bodyValidator, authValidator };
