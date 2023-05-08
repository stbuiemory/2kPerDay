const sequelize = require('../config/connection');
const { User, Plant, Location, LocatedPlant } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');
const plantData = require('./plantData.json');
const locatedPlantData = require('./locatedPlantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Plant.bulkCreate(plantData);
  await Location.bulkCreate(locationData);
  await LocatedPlant.bulkCreate(locatedPlantData);

  process.exit(0);
};

seedDatabase();
