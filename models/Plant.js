const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Plant model
class Plant extends Model {}

// create fields/columns for Plant model
Plant.init(
  {
    id: {
      // are we using the id from the API?
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_data: {
      // fetch data from API
      /* scientific name, common name, indoor, watering, sun, etc.
      INDOOR (HOUSE PLANT)
      OUTDOOR (GARDEN)

      FRUITS
      FLOWERS

      PERENNIAL
      ANNUAL

      SUN REQUIREMENTS
      WATERING
      MAINTENANCE
      CARE LEVEL (this is a diff field than maintenance)
      PROPAGATION
      SOIL NEEDS
      */
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
