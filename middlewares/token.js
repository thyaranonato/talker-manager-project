// Referência para gerar token aleatório
// https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs/8022a9b1-7548-4298-97ce-9acfa8986e66/exercicios/cd144a75-8c79-4a5c-a9b2-0e48607de5c3/bonus/6669bd34-b9a0-425f-b7ca-5cb5365746b4?use_case=side_bar
// Requisito 03
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;
