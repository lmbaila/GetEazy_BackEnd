const { Joi, Segments } = require('celebrate');

exports.create = {
  body: Joi.object({
    store_name: Joi.string().min(2).max(100).required(),
    nuit: Joi.string().min(9).max(9).required(),
    bank_account: Joi.string().min(9)
  })
};

exports.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
};