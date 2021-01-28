'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class symbol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.symbol.belongsToMany(models.user,{through:"watchlist"})
    }
  };
  symbol.init({
    symbol: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'symbol',
  });
  return symbol;
};