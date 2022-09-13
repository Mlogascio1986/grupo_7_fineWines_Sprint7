'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Varietal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Varietal.init({
    nameVarietal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Varietal',
  });
  return Varietal;
};