/* eslint-disable object-curly-newline */
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // Gets all users
    const users = await prisma.user.findMany({
      include: {
        review: true,
      },
    });
    // Returns a 200 'OK' HTTP code response + all infos JSON
    return res.status(200).json(users);
    // Returns a 400 'Bad Request' if any error occurs
  } catch (error) {
    res.status(400);
    // Triggers the error handling middleware
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const { firstname, lastname, avatar, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        avatar,
        email,
        password,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    // Returns a 422 'Bad Request' if any error occurs in creation processus
    res.status(422);
    return next(error);
  }
});

module.exports = router;
