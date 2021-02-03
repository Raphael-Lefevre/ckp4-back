const express = require('express');

const users = require('./users');
const hotels = require('./hotels');
const pictures = require('./pictures');
const reviews = require('./reviews');
// const auth = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌏',
  });
});

router.use('/users', users);
router.use('/hotels', hotels);
router.use('/pictures', pictures);
router.use('/reviews', reviews);
// router.use('/auth', auth);

module.exports = router;
