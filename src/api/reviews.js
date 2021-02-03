/* eslint-disable object-curly-newline */
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // Gets all users
    const reviews = await prisma.review.findMany();
    // Returns a 200 'OK' HTTP code response + all infos JSON
    return res.status(200).json(reviews);
    // Returns a 400 'Bad Request' if any error occurs
  } catch (error) {
    res.status(400);
    // Triggers the error handling middleware
    return next(error);
  }
});

// model Review {
//     id        Int    @id @default(autoincrement())
//     review    Int
//     comment   String
//     author    User    @relation(fields: [authorId], references: [id])
//     authorId  Int
//     hotel     Hotel   @relation(fields: [hotelId], references: [id])
//     hotelId   Int

router.post('/', async (req, res, next) => {
  const { review, comment, authorId, hotelId } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        review,
        comment,
        author: {
          connect: { id: parseInt(authorId, 10) },
        },
        hotel: {
          connect: { id: parseInt(hotelId, 10) },
        },
      },
    });
    return res.status(201).json(newReview);
  } catch (error) {
    // Returns a 422 'Bad Request' if any error occurs in creation processus
    res.status(422);
    return next(error);
  }
});

module.exports = router;
