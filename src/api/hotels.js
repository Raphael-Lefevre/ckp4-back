const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // Gets all users
    const hotels = await prisma.hotel.findMany({
      include: {
        picture: true,
        review: true,
      },
    });
    // Returns a 200 'OK' HTTP code response + all infos JSON
    return res.status(200).json(hotels);
    // Returns a 400 'Bad Request' if any error occurs
  } catch (error) {
    res.status(400);
    // Triggers the error handling middleware
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { label, country } = req.body;
  try {
    const hotel = await prisma.hotel.create({
      data: {
        label,
        country,
      },
    });
    return res.status(201).json(hotel);
  } catch (error) {
    // Returns a 422 'Bad Request' if any error occurs in creation processus
    res.status(422);
    return next(error);
  }
});

module.exports = router;
