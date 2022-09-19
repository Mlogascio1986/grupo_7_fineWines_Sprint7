'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.associate = function(models){
        User.belongsTo(models.Rol, {
            as: 'Rol',
            foreignKey: 'Id'
        }
            )
    }
    }
  }
  User.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    nombreUsuario: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    rolesId: DataTypes.STRING,
    fechaNacimiento: DataTypes.INTEGER,
    domicilio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};