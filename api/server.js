const express = require('express');

const db = require('../data/dbConfig.js');
const accountRouter = require('../accountsRouter');

const server = express();

server.use(express.json());
server.use('/accounts', accountRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Carlos server is up and working ' });
});
module.exports = server;
