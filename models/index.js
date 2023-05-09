const User = require('./User');
const Plant = require('./Plant');

// User can have many Plants
User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// A Plant belongs to a User
Plant.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Plant };
