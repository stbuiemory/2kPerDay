const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class LocatedPlant extends Model {}

// create fields/columns for Location model
LocatedPlant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
        unique: false,
      },
    },
    plant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'plant',
        key: 'id',
        unique: false, // a plant can belong to many users
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'garden',
  }
);

module.exports = LocatedPlant;
