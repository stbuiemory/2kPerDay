const dayjs = require('dayjs');
const { LocatedPlant, Plant } = require('../models');

//import dayjs from 'dayjs'
dayjs().format();

/*
get plant id
get watering freq from api data
convert watering freq to number of days for our usage
? return this to stored plant data for each location

get user id
get timestamp.date when user created/added plant to location
? add water freq number of days to plant data here?

get new date for next watering action
calculate time diff (countdown?) to next watering action

if countdown is >= 0, return countdown time to user
else if countdown is < 0, return dead plant and/or deduct points

const
1. dateAdded = now from dayjs or created on timestamp
2. daysUntilNextAction = difference between now and created on divided by watering freq days
3. daysSinceLastAction =
4. newWateringDate =
5. repeat steps 2 and 3 and reset step 4
*/

const now = dayjs();

// const dateLastActed = || const daysSinceLastAction =
const daysUntilNextAction = now.diff(LocatedPlant.createdOn) % Plant.watering;
const newWateringDate = now.add(daysUntilNextAction, 'day');
const countdown = newWateringDate.diff(now, 'day');

if (countdown > 0) {
  console.log('You have ${countdown} days to water your plant!');
} else {
  console.log(
    'Your plant has died. Please plant another one and try to remember to water it.'
  );
}

/* notes from original plantRoutes.js

// need to figure out how/where to add DAYS to a user's plant selection with moment js

EXAMPLE: `dayjs(timestamp).add(number, 'days');`
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

/*

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

*/
