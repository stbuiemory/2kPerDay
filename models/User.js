const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// create fields/columns for user model
// Do we want to include a level or status, emoji/badge for points accumulated?
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // must be longer than 8 characters
      validate: {
        len: [8],
        isAlphanumeric: true,
      },
    },
  },
  {
    // ADDING THESE HOOKS HERE FOR PRACTICE, maybe not necessary unless emails are not recognized as "unique" if they are mixed case
    // When adding hooks via the init() method, they go below
    hooks: {
      // Use the beforeCreate hook to work with data before a new instance is created
      beforeCreate: async (newUserData) => {
        // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
        newUserData.email = await newUserData.email.toLowerCase();
        return newUserData;
      },
      // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
