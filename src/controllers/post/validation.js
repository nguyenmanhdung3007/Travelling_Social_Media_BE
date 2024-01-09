const Joi = require('joi')

const postSchema = Joi.object({
    content: Joi.string(),
    images: Joi.array(),
})

module.exports = {postSchema}