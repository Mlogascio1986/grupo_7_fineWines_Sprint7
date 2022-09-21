'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bodegas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasMany(models.Product);
    }
  }
  Bodegas.init({
    nameBodega: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bodegas',
  });
  return Bodegas;
};