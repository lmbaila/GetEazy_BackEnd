const express = require('express');
const auth = require('./../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', (req, res)=>{
  res.send({product: 'list product'});
});
module.exports = app => app.use('/product', router);
