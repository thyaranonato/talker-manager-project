const fs = require('fs').promises;
const bodyParser = require('body-parser');
const express = require('express');
const generateToken = require('./token');

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

// Requisito 03
router.post('/', (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;
