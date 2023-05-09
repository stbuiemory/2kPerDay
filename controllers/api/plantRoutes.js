const router = require('express').Router();
const { Plant } = require('../../models');
const dayjs = require('dayjs');

dayjs().format();

// GET all plants and JOIN with user data
router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    // Serialize data so the template can read it
    const plants = plantData.map((plant) => plant.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('mygarden', {
      plants,
      logged_in: req.session.logged_in,
    });
    // res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single plant
router.get('/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!plantData) {
      res.status(404).json({ message: 'No plant found with this id!' });
      return;
    }

    const plant = plantData.get({ plain: true });

    res.render('viewspecificplant', {
      ...plant,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    //include handlebars to addplant
  }
});

// CREATE (OR ADD) a single plant
router.post('/', async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.render('viewspecificplant', {
      ...newPlant,
      logged_in: req.session.logged_in,
    });
    // res.status(200).json(newPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

    const plant = plantData.get({ plain: true });
    // LIL TODO: Do we need to have a diff hbs for deleted plants?
    res.render('viewspecificplant', {
      ...plant,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
