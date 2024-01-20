const Joi = require("joi");

const postSchema = Joi.object({
  vacationId: Joi.string().required(),
  milestoneId: Joi.string().required(),
  content: Joi.string(),
});

module.exports = { postSchema };
