const express = require('express');
const cors = require('cors')
const server = express();
server.use(cors())
server.use(express.json())



module.exports = server;
const port = process.env.PORT || 5000;

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
