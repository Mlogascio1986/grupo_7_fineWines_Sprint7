//const jsonDB = require('../model/jsonDatabase.js');//reuiero el modelo
//const userModel = jsonDB('users')//modelo con user
const {User, Rol} = require("../database/models");
const {Op} = require('sequelize')
// Genero y actualizo la variable de aplicacion: UserLogged
//function userLoggedMiddleware(req, res, next){
const userLoggedMiddleware = async (req, res, next) => {      
res.locals.isLogged = false;
let emailInCookie = req.cookies.userEmail;


try{
    const userFromCookie = await User.findOne({
        where: {
            email :  {[Op.eq] : emailInCookie}
         },
    })
//let userFromCookie = userModel.findFirstByField("email", emailInCookie);
//console.log(userFromCookie);
if (userFromCookie) {
    req.session.userLogged= userFromCookie;
}
if(req.session.userLogged){
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
}
next();
}
catch (error) {res.json(error.message) }
}
module.exports = userLoggedMiddleware;
