const router = require('express').Router();
const { Plant } = require('../../models');

// need to figure out how/where to add DAYS to a user's plant selection with moment js
/* EXAMPLE: `dayjs(timestamp).add(number, 'days');`
WHERE THE FIRST () IS THE ORIGINATING TIMESTAMP
AND THE SECOND () IS THE NUMBER OF DAYS FROM OUR WATERING FREQUENCY GUIDELINES
When a plant is added to a user's location, it adds a timestamp.
That timestamp is the start time of plant watering or a care action.
Then according to the watering frequency attribute on the plant, the timestamp + days countdown is displayed to the user.
The countdown time is number of days (not a login count).
So that if the user doesn't log in and take action (watering, feeding, pruning, etc.) in the allotted time frame, the plant is unhappy (or dead if a certain number of days passes since last login.)

FUTURE DEV: User points are accrued (or deducted) for number of plants kept alive for however many days so badges/titles can be earned and user can level up so that FANCY & RARE PLANTS ARE UNLOCKED!!!!
Another FUTURE DEV idea: Email notifications guilt-tripping you into logging into the app like Duolingo.
*/

const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

// GET all plants
router.get('/', async (req, res) => {
  try {
    const plantData = await Plant.findAll();
    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single plant
router.get('/:id', async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      // JOIN with Location, using the User through table
      include: [{ model: Location, through: User, as: 'plant_locations' }],
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

// CREATE a single plant
router.post('/', async (req, res) => {
  try {
    const newPlant = await Plant.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPlant);
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

    res.status(200).json(plantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
