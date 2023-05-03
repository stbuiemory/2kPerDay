const router = require('express').Router();
const { Plant } = require; // need to determine path to models folder (does this route need to be in api folder inside the controller folder -- see file structure from class)
const withAuth = require; // need to add auth file to utils

// need to figure out how/where to add DAYS to a user's plant selection with moment js
/* EXAMPLE: `moment(timestamp).add(number, 'days');`
WHERE THE FIRST () IS THE ORIGINATING TIMESTAMP
AND THE SECOND () IS THE NUMBER OF DAYS FROM OUR WATERING FREQUENCY GUIDELINES
When a plant is added to a user's place, it adds a timestamp.
That timestamp is the start time of plant watering or a care action.
Then according to the watering frequency attribute on the plant, the moment + days countdown is displayed to the user.
The countdown time is number of days (not a login count).
So that if the user doesn't log in and take action (watering, feeding, pruning, etc.) in the allotted time frame, the plant is unhappy (or dead if a certain number of days passes since last login.)
FUTURE DEV: User points are accrued (or deducted) for number of plants kept alive for however many days so badges/titles can be earned and user can level up so that FANCY & RARE PLANTS ARE UNLOCKED!!!!
Another FUTURE DEV idea: Email notifications guilt-tripping you into logging into the app like Duolingo.
*/
const moment = require('moment');

router.post('/', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
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
