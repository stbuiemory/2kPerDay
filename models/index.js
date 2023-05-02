const Parent = require('./Parent');
const Plant = require('./Plant');
// Location is indoor, outdoor, greenhouse, sunroom, windowsill, etc.
const Place = require('./Place');

// Plant Parent has ONE Place for now (future can have multiple gardens, sunrooms, etc.)
Parent.hasOne(Place, {
  foreignKey: 'parent_id',
  onDelete: 'CASCADE',
});

// Parent can have many Plants
Parent.hasMany(Plant, {
  foreignKey: 'parent_id',
  onDelete: 'CASCADE',
});

// A plant belongs to a single parent or belongsToMany ???? Are we thinking plant as a single item, or a plant type (unlimited qty)
Plant.belongsTo(Parent, {
  foreignKey: 'parent_id',
});

// A Place belongs to a parent
Place.belongsTo(Parent, {
  foreignKey: 'parent_id',
});

module.exports = { Reader, Book, LibraryCard };

// NEED TO DEFINE RELATIONSHIP BETWEEN PLANTS AND PLACES
// USE  `through:` PARENT? like below
// I need to think about "Place.belongsTo___?(Plant)" a bit more

Plant.belongsToMany(Place, {
  through: {
    model: Parent,
    unique: false,
  },
  as: 'placed_plants', // plants featured in a user's place
});

Place.belongsToMany(Plant, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Parent,
    unique: false,
  },
  // alias for when data is retrieved
  as: 'plant_places', // does this name convey idea correctly? All the places (from multiple users) where a plant is used
});

module.exports = { Parent, Place, Plant };
