const fs = require('fs').promises;
const bodyParser = require('body-parser');
const express = require('express');

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

module.exports = router;