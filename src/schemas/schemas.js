const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(5).max(30).required(),
});
const authSchema = Joi.object({
  authorization: Joi.string().required(),
});
module.exports = { userSchema, authSchema };
