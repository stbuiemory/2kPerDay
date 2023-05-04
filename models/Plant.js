
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
    family: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cycle: {
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
    Propagation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'parent',
        key: 'id',
        unique: false, // a plant can belong to many users
      },
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'place',
        key: 'id',
        unique: false, // a plant can belong in many places
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
