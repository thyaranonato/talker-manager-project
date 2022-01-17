const fs = require('fs').promises;
const bodyParser = require('body-parser');
const express = require('express');
const { validateToken, validateName, validateAge, validateTalk,
  validateWatchedAt, validateRate } = require('./auth-middleware');

const router = express.Router();
router.use(bodyParser.json());

const talkers = async () => {
  const talkersList = await fs.readFile('./talker.json');
  const response = await JSON.parse(talkersList);
  return response;
};

// Requisito 01
router.get('/', async (_req, res) => {
  const listOfTalkers = await talkers();
  if (listOfTalkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(listOfTalkers);
});

// Requisito 02
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const listOfTalkers = await talkers();
  const findTalkerById = listOfTalkers.find((talker) => talker.id === parseInt(id, 10));
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(findTalkerById);
});

// Requisito 04
router.post('/', validateToken, validateName, validateAge, validateTalk,
  validateWatchedAt, validateRate, async (req, res) => {
  const listOfTalkers = await talkers();
  const newTalker = { id: listOfTalkers.length + 1, ...req.body };

  listOfTalkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(listOfTalkers));
  return res.status(201).json(newTalker);
});

// Requisito 05
router.put('/:id', validateToken, validateName, validateAge, validateTalk,
  validateWatchedAt, validateRate, async (req, res) => {
  const { id } = req.params;
  const listOfTalkers = await talkers();

  const findTalkerIndex = listOfTalkers.findIndex((talker) => talker.id === parseInt(id, 10));
  listOfTalkers[findTalkerIndex] = { ...listOfTalkers[findTalkerIndex], ...req.body };
  await fs.writeFile('./talker.json', JSON.stringify(listOfTalkers));

  return res.status(200).json(listOfTalkers[findTalkerIndex]);
});

// Requisito 06
// Resolução seguindo modelo do Course, link: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/49c70140-9b30-435e-a433-f8f98dcb23ca/router-middleware/3fa04e83-1fc3-4e82-9d04-a979ccf370a9?use_case=side_bar
router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const listOfTalkers = await talkers();

  const findTalkerIndex = listOfTalkers.findIndex((talker) => talker.id === parseInt(id, 10));
  listOfTalkers.splice(findTalkerIndex, 1);
  await fs.writeFile('./talker.json', JSON.stringify(listOfTalkers));

  return res.status(204).json();
});

module.exports = router;
