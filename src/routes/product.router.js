const express = require('express');
const { celebrate, Joi } = require('celebrate');

const product = require('./../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

const validateProduct = require('../validations/product.validation');

// router.use(authMiddleware);
router.get('/', product.index);
router.post('/register', celebrate(validateProduct.create, {abortEarly:false, allowUnknown: true}), product.create);
router.put('/edit/:id', celebrate(validateProduct.update, {abortEarly:false, allowUnknown: true}), product.update);
router.delete('/delete/:id', celebrate(validateProduct.delete, {abortEarly:false, allowUnknown: true}), product.delete);

module.exports = app => app.use('/product', router);
