const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Parent model
class Parent extends Model {}

// create fields/columns for Parent model
// Do we want to include a level or status, emoji/badge for points accumulated?
Parent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    points: {
      type: DataTypes.INTEGER,
      allowNull: true, // starting level at zero or blank?
      /* users accumulate points for caring for their plants 
      or for completing quizzes about plant knowledge 
      points indicate user level or progress in plant parenting
      earn badges or prizes (like fertilizer or cute labels or new garden tools) for leveling up
      */
    },
  },
  {
    // ADDING THESE HOOKS HERE FOR PRACTICE, maybe not necessary unless emails are not recognized as "unique" if they are mixed case
    // When adding hooks via the init() method, they go below
    hooks: {
      // Use the beforeCreate hook to work with data before a new instance is created
      beforeCreate: async (newParentData) => {
        // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
        newParentData.email = await newParentData.email.toLowerCase();
        return newParentData;
      },
      // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
      beforeUpdate: async (updatedParentData) => {
        updatedParentData.email = await updatedParentData.email.toLowerCase();
        return updatedParentData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "parent",
  }
);

module.exports = Parent;
