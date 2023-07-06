// Когда пытаемся создать пользователя с идентичным уникальным значением поля

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
