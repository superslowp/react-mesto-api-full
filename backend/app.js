const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/userRoutes');
const cardsRouter = require('./routes/cardRoutes');
const { createUser, login } = require('./controllers/userController');
const errorsHandler = require('./utils/errorHandler');
const { validateLogin, validateRegister } = require('./utils/validators/userValidator');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./utils/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); 

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Неправильный URL');
});

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
