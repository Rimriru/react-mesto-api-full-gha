const { Joi, celebrate } = require('celebrate');
const linkRegularExpression = require('./regularExpressions');

const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegularExpression),
  }),
});

const userCredentialsValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const newUserDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegularExpression),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
  userCredentialsValidation,
  newUserDataValidation,
};
