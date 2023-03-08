const HTTPError = require('../errors/HTTPError');
const jwtUtils = require('../utils/jwtUtils');
const { Users } = require('../models');

const verifyToken = async (token) => {
  const validatedToken = await jwtUtils.verifyToken(token);
  if (!validatedToken) {
    throw new HTTPError('Invalid token', 401);
  } else {
    const userExist = await Users.findOne({
      where: { id: validatedToken.id },
    });
    if (!userExist) throw new HTTPError('User not found', 401);
    else {
      return userExist;
    }
  }
};
module.exports = { verifyToken };
