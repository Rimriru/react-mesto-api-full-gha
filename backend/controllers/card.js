const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  notFoundErrorMessage,
  noRightsErrorMessage,
  notValidErrorMessage,
} = require('../errors/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const ValidationError = require('../errors/ValidationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((card) => {
      if (card.owner.valueOf() === req.user._id) {
        Card.deleteOne({ _id: cardId })
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new NoRightsError(noRightsErrorMessage));
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError(notFoundErrorMessage))
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError(notFoundErrorMessage))
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(notValidErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
