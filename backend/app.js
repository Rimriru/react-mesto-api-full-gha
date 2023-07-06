require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const {
  userCredentialsValidation,
  newUserDataValidation,
} = require('./utils/userValidationRules');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const corsOptions = {
  origin: 'https://mesto-page.nomoreparties.sbs',
  credentials: true,
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standartHeaders: true,
  legacyHeaders: false,
});

const app = express();

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log(`Подключён к базе данных по адресу ${MONGODB_URL}`);
  });

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  userCredentialsValidation,
  login,
);
app.post(
  '/signup',
  newUserDataValidation,
  createUser,
);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы успешно вышли из профиля!' });
});
app.use(auth);
app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Cервер запущен на порту ${PORT}`);
});
