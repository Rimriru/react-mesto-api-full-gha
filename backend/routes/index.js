const router = require('express').Router();
const userRoutes = require('./user');
const cardRoutes = require('./card');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Роут не найден'));
});

module.exports = router;
