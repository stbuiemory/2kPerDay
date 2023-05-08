const router = require('express').Router();
const { LocatedPlant } = require('../../models');

// GET all located plants
router.get('/', async (req, res) => {
  try {
    const locatedPlantData = await LocatedPlant.findAll();
    res.status(200).json(locatedPlantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single located plant
router.get('/:id', async (req, res) => {
  try {
    const locatedPlantData = await LocatedPlant.findByPk(req.params.id, {
      // JOIN with Plant, using Location (or should this be JOIN with Location through Plant?)
      include: [{ model: Plant, through: Location, as: 'featured_plants' }],
    });

    if (!locatedPlantData) {
      res
        .status(404)
        .json({ message: 'No such plant in this sanctuary. Plant a new one!' });
      return;
    }

    res.status(200).json(locatedPlantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a single located plant (aka WATERING, or another care action in future dev)
// Should we consider this like "posting a comment to a blog"? See below example.
router.post('/waterplant', async (req, res) => {
  try {
    const locatedPlantData = await LocatedPlant.findByPk(req.params.id, {
      include: [{ model: Plant }],
      attributes: [id, watering, sunLight],
    });
    res.status(200).json(locatedPlantData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// function BlogPost(authorName, title, text, createdOn) {
//   this.authorName = authorName;
//   this.title = title;
//   this.text = text;
//   this.createdOn = createdOn;
//   this.comments = [];
//   this.printMetaData = function () {
//     console.log(`Created by ${this.authorName} on ${this.createdOn}`);
//   };
// }

// // Method that takes in a comment and adds it to the BlogPost's comments array
// BlogPost.prototype.addComent = function (comment) {
//   this.comments.push(comment);
// };

// ADD a plant to a location
router.post('/addplant', async (req, res) => {
  try {
    const newLocatedPlant = await LocatedPlant.create({
      ...req.body,
      location_id: req.session.location_id,
    });
    res.status(200).json(newLocatedPlant);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a plant from a location
router.delete('/:id', async (req, res) => {
  try {
    const locatedPlantData = await LocatedPlant.destroy({
      where: {
        id: req.params.id,
        plant_id: req.session.plant_id,
      },
    });

    if (!locatedPlantData) {
      res
        .status(404)
        .json({ message: 'No such plant located here. Try again.' });
      return;
    }
    res.status(200).json(locatedPlantData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

/* EXAMPLE FROM CLASS
class BlogPost extends ForumItem {
  constructor(authorName, title, text, createdOn) {
    super(authorName, text, createdOn);
    this.title = title;
    this.comments = [];
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}
// ANOTHER EXAMPLE FROM CLASS
// Constructor function that defines the properties that make up a BlogPost
function BlogPost(authorName, title, text, createdOn) {
  this.authorName = authorName;
  this.title = title;
  this.text = text;
  this.createdOn = createdOn;
  this.comments = [];
  this.printMetaData = function () {
    console.log(`Created by ${this.authorName} on ${this.createdOn}`);
  };
}

// Method that takes in a comment and adds it to the BlogPost's comments array
BlogPost.prototype.addComent = function (comment) {
  this.comments.push(comment);
};

const post = new BlogPost(
  'John Doe',
  'My Second Post',
  'Cats are super cute!',
  '12/16/2021'
);

post.addComent('Nice post, I like it!');

// Should show an array with 1 child that says 'Nice post, I like it!'
console.log(post.comments);
*/
