const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./middlewares/talkerRouter');
const { validateEmail, validatePassword } = require('./middlewares/auth-middleware');
const generateToken = require('./middlewares/token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisitos 01 e 02
app.use('/talker', talkerRouter);

// Requisito 03
app.use('/login', validateEmail, validatePassword, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

app.listen(PORT, () => {
  console.log('Online');
});
