const {Product, Bodegas, Varietal, Imagesproduct} = require('../database/models');
const { validationResult } = require("express-validator");

//const products = productModel.readFile()
//console.log(products);
//Objeto literal mainController
//Viene de mainRouter a cada modulo
const mainController = {
    index: async (req,res) => {
        try {
            const productsHk = await Product.findAll({
                include: [Varietal, Bodegas, Imagesproduct]
            })
           
            res.render('index', { productsHk});
        } catch (error) {
            res.json(error.message) 
        }
       
    },
    productCart: (req,res) => {
        res.render('productCart');
    },
    login: (req, res) => {
        res.render('users/login.ejs');
    },
    register:(req, res) => {
        res.render('users/register.ejs');
    },
    productDetail: async (req,res) => {
        //const id = Number(req.params.id);
        try {
            const { id } = req.params
            const product = await Product.findByPk(id, {
                include: [Bodegas,Varietal,Imagesproduct]
            });
            return res.render('productDetail', {product});
            
        }catch (error) {
            res.json(error.message)
        }
        //const products = productModel.readFile()
        //const product = products.find( product => product.id === id);

        //res.render('productDetail', {product});
    },
    productDetailApi: async (req,res) => {
        //const id = Number(req.params.id);
        try {
            const { id } = req.body
            const product = await Product.findByPk(id, {
                include: [Bodegas,Varietal,Imagesproduct]
            });
            return res.json({product});
            
        }catch (error) {
            res.json(error.message)
        }
        //const products = productModel.readFile()
        //const product = products.find( product => product.id === id);

        //res.render('productDetail', {product});
    }
}

module.exports = mainController