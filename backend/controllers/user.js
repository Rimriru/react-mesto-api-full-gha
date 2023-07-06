// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const {
  unauthorizedErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
  notValidErrorMessage,
} = require('../errors/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(unauthorizedErrorMessage))
    .then((user) => bcrypt.compare(password, user.password)
      .then(() => {
        const token = jwt.sign(
          { _id: user._id },
          `${process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'super-secret-pass'}`,
          { expiresIn: 3600000 * 24 * 7 },
        );
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
        res.send({ message: 'Вы успешно залогинились!' });
      })
      .catch((err) => {
        next(err);
      }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((newUser) => res.status(201).send(
        {
          _id: newUser._id,
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
        },
      ))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new ValidationError(notValidErrorMessage));
        } else if (err.code === 11000) {
          next(new ConflictError(conflictErrorMessage));
        } else {
          next(err);
        }
      });
  });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
};
