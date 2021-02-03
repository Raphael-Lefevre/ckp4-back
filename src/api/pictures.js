const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // Gets all users
    const pictures = await prisma.picture.findMany();
    // Returns a 200 'OK' HTTP code response + all infos JSON
    return res.status(200).json(pictures);
    // Returns a 400 'Bad Request' if any error occurs
  } catch (error) {
    res.status(400);
    // Triggers the error handling middleware
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { media, hotelId } = req.body;
  try {
    const picture = await prisma.picture.create({
      data: {
        media,
        hotel: {
          connect: { id: parseInt(hotelId, 10) },
        },
      },
    });
    return res.status(201).json(picture);
  } catch (error) {
    // Returns a 422 'Bad Request' if any error occurs in creation processus
    res.status(422);
    return next(error);
  }
});

module.exports = router;
