const express = require('express');

const mainController = require ('../controllers/mainController.js')

const router= express.Router();

router.get('/', mainController.index);
router.get('/productCart', mainController.productCart);
router.get('/productDetail/:id', mainController.productDetail);
//probando APIS
router.get('/productDetailApi', mainController.productDetailApi);

module.exports = router;

