const jwt = require('jsonwebtoken');
const redisUtils = require('./redisUtil');

const generateToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const data = {
    id: user.id,
  };
  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: '1h',
  });

  return token;
};
const verifyToken = async (token) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const isTokenCorrect = jwt.verify(token, jwtSecretKey, (err, decoded) => {
    return err ? false : decoded;
  });
  if (!isTokenCorrect) {
    return false;
  }
  const redisCheck = await redisUtils.getToken(token);
  if (!redisCheck) return false;
  else {
    return isTokenCorrect;
  }
};
module.exports = { generateToken, verifyToken };
