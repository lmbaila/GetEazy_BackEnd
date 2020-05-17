const { Joi, Segments } = require('celebrate');

exports.create = {
  body: Joi.object({
    product_name: Joi.string().min(2).max(100).required(),
    brand: Joi.string().min(2).max(9).required()
  })
};

exports.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
};

exports.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
};