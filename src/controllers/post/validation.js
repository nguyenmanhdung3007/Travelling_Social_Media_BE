const Joi = require("joi");

const postSchema = Joi.object({
  content: Joi.string(),
});

module.exports = { postSchema };
