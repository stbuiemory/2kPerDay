const User = require('./User');
const Plant = require('./Plant');
// Location is indoor, outdoor, greenhouse, sunroom, windowsill, etc.
const Location = require('./Location');

// User has ONE Location for now (future can have multiple gardens, sunrooms, etc.)
User.hasOne(Location, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// User can have many Plants
User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A plant belongs to a single User or belongsToMany ???? Are we thinking plant as a single item, or a plant type (unlimited qty)
Plant.belongsTo(User, {
  foreignKey: 'user_id',
});

// A Location belongs to a User
Location.belongsTo(User, {
  foreignKey: 'user_id',
});

// NEED TO DEFINE RELATIONSHIP BETWEEN PLANTS AND LOCATIONS
// USE  `through:` USER? like below
// I need to think about "Location.belongsTo___?(Plant)" a bit more

Plant.belongsToMany(Location, {
  through: {
    model: User,
    unique: false,
  },
  as: 'featured_plants', // plants featured in a user's Location
});

Location.belongsToMany(Plant, {
  // Define the third table needed to store the foreign keys
  through: {
    model: User,
    unique: false,
  },
  // alias for when data is retrieved
  as: 'plant_locations', // does this name convey idea correctly? All the Locations (from multiple users) where a plant is used
});

module.exports = { User, Location, Plant };
