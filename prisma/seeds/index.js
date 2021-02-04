/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const prisma = require('../../src/prismaClient');

(async () => {
  // DATA RESET (Delete all data and set id incremenent back to initial value)
  await prisma.picture.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE Picture AUTO_INCREMENT = 1;');
  await prisma.review.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE Review AUTO_INCREMENT = 1;');
  await prisma.$executeRaw('DELETE FROM User;');
  await prisma.$executeRaw('ALTER TABLE User AUTO_INCREMENT = 1;');
  await prisma.hotel.deleteMany({});
  await prisma.$executeRaw('ALTER TABLE Hotel AUTO_INCREMENT = 1;');

  //   CREATE USER SEEDS
  const users = [
    {
      firstname: 'Raphaël',
      lastname: 'Lefèvre',
      avatar: 'https://i.imgur.com/N9Mxfbi.jpg',
      email: 'raph.lefevre@gmail.com',
      password: 'P@ssw0rd',
    },
    {
      firstname: 'Brad',
      lastname: 'Pitt',
      avatar:
        'https://images0.persgroep.net/rcs/5LFAKktAeiimGPgyZe3RyhgQObA/diocontent/177352810/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8',
      email: 'brad@gmail.com',
      password: 'P@ssw0rd',
    },
  ];

  const usersSeeds = users.map((item) => {
    return prisma.user.create({
      data: {
        firstname: item.firstname,
        lastname: item.lastname,
        avatar: item.avatar,
        email: item.email,
        password: item.password,
      },
    });
  });
  await Promise.all(usersSeeds)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

  //   CREATE HOTEL SEEDS
  const hotels = [
    {
      label: 'La Pirogue',
      country: 'Ile Maurice',
    },
    {
      label: 'Le Katikies',
      country: 'Santorin',
    },
  ];

  const hotelsSeeds = hotels.map((item) => {
    return prisma.hotel.create({
      data: {
        label: item.label,
        country: item.country,
      },
    });
  });
  await Promise.all(hotelsSeeds)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

  //   CREATE PICTURE SEEDS
  const pictures = [
    {
      media:
        'https://cf.bstatic.com/images/hotel/max1024x768/242/242472111.jpg',
      hotelId: 1,
    },
    {
      media:
        'https://i.pinimg.com/originals/21/78/4d/21784d6ff3a775466b9e336ab7cda38e.jpg',
      hotelId: 2,
    },
  ];

  const picturesSeeds = pictures.map((item) => {
    return prisma.picture.create({
      data: {
        media: item.media,
        hotelId: item.hotelId,
      },
    });
  });
  await Promise.all(picturesSeeds)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));

  //   CREATE REVIEW SEEDS
  const reviews = [
    {
      review: 5,
      comment: 'Le paradis sur terre...',
      authorId: 1,
      hotelId: 1,
    },
    {
      review: 4,
      comment: 'Regardez-moi cette vue',
      authorId: 2,
      hotelId: 2,
    },
  ];

  const reviewsSeeds = reviews.map((item) => {
    return prisma.review.create({
      data: {
        review: item.review,
        comment: item.comment,
        authorId: item.authorId,
        hotelId: item.hotelId,
      },
    });
  });
  await Promise.all(reviewsSeeds)
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
})().finally(async () => {
  await prisma.$disconnect();
});
