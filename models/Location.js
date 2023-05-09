const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Location extends Model {}

// create fields/columns for Location model
Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false, // a plant can belong to many users
      },
    },
    // LILLIAN TODO: We likely need to change this to an array of objects (aka plants)
    // plant_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'plant',
    //     key: 'id',
    //     unique: false, // a plant can belong in many locations
    //   },
    },

    // Commented out so that server can run
  //   located_plants: {
  //     type: DataTypes.ARRAY(DataTypes.STRING),
  //     allowNull: true,
  //     references: {
  //       model: 'locatedplant',
  //       key: 'id',
  //       unique: false, // maybe should be true, as a located plant can only be in 1 location
  //     },
  //   },
  // },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;
