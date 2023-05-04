const router = require('express').Router();
const { Location } = require('../models');
const withAuth = require('../utils/auth');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Plant, through: User, as: 'featured_plants' }],
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a location
router.post('/', withAuth, async (req, res) => {
  try {
    const newLocation = await Location.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a location
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with this id.' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
