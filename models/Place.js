const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Place extends Model {}

// create fields/columns for Place model
Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_name: {
      // are we offering users a list of options to choose from
      // or are they giving their "garden" a name like "Ina's Garden" etc?
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'place',
  }
);

module.exports = Place;
