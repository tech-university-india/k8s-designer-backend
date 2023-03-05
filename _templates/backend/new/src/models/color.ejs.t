---
to:  "<%= (databases.length > 0 ? (outputPath + '/' + appName + '/src/models/color.js') : null) %>"
force: true
---
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Color.init({
    name: DataTypes.STRING,
    hex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};