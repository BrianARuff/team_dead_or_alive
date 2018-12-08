
const express = require('express');
// const knex = require('knex')
// const knexConfig = require('./knexfile.js')
// const db = knex(knexConfig.development)
const server = express();
server.use(express.json())

  server.get('/', (req, res) => {
    res.status(200).json('working!')

  })



const port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
