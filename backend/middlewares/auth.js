const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  unauthorizedErrorMessage,
} = require('../errors/errorMessages');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  } else {
    try {
      const payload = jwt.verify(req.cookies.jwt, `${process.env.JWT_SECRET}`);
      req.user = payload;
      next();
    } catch (err) {
      next(new UnauthorizedError(unauthorizedErrorMessage));
    }
  }
};

module.exports = auth;
