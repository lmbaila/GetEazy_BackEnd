const express = require('express');
const auth = require('./../controllers/auth.controller');
const router = express.Router();
const validadeUser = require('../validations/user.validation');
const { celebrate, Joi } = require('celebrate');
router.get('/users', auth.index);
router.post('/register', celebrate(validadeUser.create, {abortEarly:false, allowUnknown: true}), auth.create);
router.post('/login', celebrate(validadeUser.login, {abortEarly:false}), auth.autheticate);

module.exports = app => app.use('/auth', router);
