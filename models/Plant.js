const plantListURL =
  'https://perenual.com/api/species-list?page=1&key=[sk-YD7M644b1a9a55fb8682]';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Plant model
class Plant extends Model {}

// create fields/columns for Plant model
// we're using plant list
Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    common_name: {
      type: DataTypes.
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
    family: { 
      
    },
    watering: {
    
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
