const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});

redisClient.on('error', (err) => {
  console.log('Redis Connection error: ', err.message);
});
const storeToken = async (token) => {
  redisClient.connect();
  await redisClient.set(token, '1', 'EX', 3600);
  redisClient.disconnect();
};
const getToken = async (token) => {
  redisClient.connect();
  const redisToken = await redisClient.get(token);
  redisClient.disconnect();
  return redisToken;
};

module.exports = { storeToken, getToken };
