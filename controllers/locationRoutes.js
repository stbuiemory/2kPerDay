/* CRUD
Create
Read
Update - router.post
Delete - router.delete
*/

const router = require('express').Router();
const { Article, Writer, Comment } = require('../models');
// LILLIAN TO DO: this one needs doing (I forgot why I wrote this like this)
const { getAttributes } = require('../models/Writer');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      writer_id: req.session.writer_id,
    });
    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        writer_id: req.session.writer_id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No article found with this id.' });
      return;
    }
    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
