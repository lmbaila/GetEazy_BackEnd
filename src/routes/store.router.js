const express = require('express');
const { celebrate, Joi } = require('celebrate');

const store = require('./../controllers/store.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

const validateStore = require('../validations/store.validation');

// router.use(authMiddleware);
router.get('/', store.index);
router.post('/register', celebrate(validateStore.create, {abortEarly:false, allowUnknown: true}), store.create);

module.exports = app => app.use('/store', router);
