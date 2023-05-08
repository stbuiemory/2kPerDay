const dayjs = require('dayjs');
//import dayjs from 'dayjs' // ES 2015
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

REVIEW PARTIAL ROUTES
*/

const 
1. dateAdded =
2. daysUntilNextAction =
3. daysSinceLastAction =
4. newActionDate =
5. repeat steps 2 and 3 and reset step 4

const currentDate = User.findOne
const dateLastActed = || const daysSinceLastAction =
const daysUntilNextAction =


// EXAMPLE
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // USE bcrypt.compare() to compare password provided at login [req.body.password] to the hashed pw [userData.password]
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// EXAMPLE FROM INTERNET
// var currentTimeArray = [];
// function currentTime(){
//   var time = moment();
//   return currentTimeArray.push(time);
// }

// $('.next-fieldgroup').on('click', function(e){
//   e.preventDefault();
//   currentTime();

//   var endTime = $(currentTimeArray).last();
//   var startTime = currentTimeArray[0];
//   var duration = moment.duration(endTime.diff(startTime));
//   var elapsedTime = duration().asMinutes();

//   $('#timer-counter').text( elapsedTime );
// });