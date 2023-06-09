const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Plant model
class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    common_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    watering: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sunLight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plantImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;

// watering levels: Frequent, Average, Minimal
