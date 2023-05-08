const User = require('./User');
const Plant = require('./Plant');
// Location is indoor, outdoor, greenhouse, sunroom, windowsill, etc.
const Location = require('./Location');
const LocatedPlant = require('./LocatedPlant');

// User has ONE Location for now (future can have multiple gardens, sunrooms, etc.)
User.hasMany(Location, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A Location belongs to a User
Location.belongsTo(User, {
  foreignKey: 'user_id',
});

Plant.belongsToMany(Location, {
  through: LocatedPlant,
  foreignKey: 'plant_id', // plants featured in a user's location
});

Location.belongsToMany(Plant, {
  // Define the third table needed to store the foreign keys
  through: LocatedPlant,
  foreignKey: 'location_id',
});

module.exports = { User, Location, Plant, LocatedPlant };
