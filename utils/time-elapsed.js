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
