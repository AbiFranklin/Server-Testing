const express = require('express');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json([]);
});


server.post('/', async (req, res) => {
  const body = req.body;

  if (body.name) {
    const ids = await db('bears').insert(body);
    res.status(201).json(ids);
  } else {
    res.status(400).json({ error: 'No name in body' });
  }
});

server.delete('/:id', (req,res) => {
    const {id} = req.params;
    db('bears').where('id', id).del()
    .then(count => {
      res.status(200).json({ success: 'Bear successfully deleted' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete bear.' })
    })
  });

module.exports = server;