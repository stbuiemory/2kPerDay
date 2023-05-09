const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('main', { layout: 'login' });
  });

export.modules = router
