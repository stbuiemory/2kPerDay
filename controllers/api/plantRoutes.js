const router = require('express').Router();
const { Plant } = require('../../models');

const dayjs = require('dayjs');

dayjs().format();

// GET all plants
router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll();
    //include handlebars to addplant
    // res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single plant
router.get('/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      // // JOIN with Location, using the User through table
      // include: [{ model: Location, through: User, as: 'plant_locations' }],
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
    //include handlebars to addplant
  }
});

// CREATE a single plant
// router.post('/', async (req, res) => {
//   try {
//     const newPlant = await Plant.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newPlant);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// DELETE a single plant
router.delete('/:id', async (req, res) => {
  try {
    const plantData = await Plant.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
