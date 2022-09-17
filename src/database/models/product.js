'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
       /*    hasMany     */
       this.hasMany(models.Imagesproduct);

       /*    belongsTo     */
       this.belongsTo(models.Bodegas);
       this.belongsTo(models.Varietal);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    bodegasId: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    varietalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};