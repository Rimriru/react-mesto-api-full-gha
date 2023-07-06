// Когда пользователь пытается совершить действие, на которое у него нет прав

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = NoRightsError;
