const Joi = require("joi");

const userSchema = Joi.object({
  fullName: Joi.string().required(),
  bio: Joi.string(),
  dateOfBirth: Joi.date(),
  gender: Joi.string(),
});

module.exports = { userSchema };
