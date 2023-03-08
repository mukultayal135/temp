const tokenValidationService = require('../services/tokenValidation.service');
const HTTPError = require('../errors/HTTPError');

const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isValid = await tokenValidationService.verifyToken(token);
    if (!isValid) throw new HTTPError('Invalid token', 401);
    res.status(200).json({ user: isValid.id });
  } catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
module.exports = { verifyToken };
