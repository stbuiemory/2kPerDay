
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
      allowNull: false
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    watering: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sunLight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plantImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false, // a plant can belong to many users
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
        unique: false, // a plant can belong in many locations
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;
