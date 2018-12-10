
const express = require('express');
const cors = require('cors')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const server = express();
server.use(cors())
server.use(express.json())

  //test data 
  const data = [
    {name: "Betty White", dob: "January 17, 1922", dod: null, image: "https://en.wikipedia.org/wiki/Betty_White#/media/File:Betty_White_2010.jpg"},
    {name: "Heath Ledger", dob: "April 4, 1979", dod: "January 22, 2008" , image: "https://en.wikipedia.org/wiki/Heath_Ledger#/media/File:Heath_Ledger_(Berlin_Film_Festival_2006)_revised.jpg"},
    {name: "Wilford Brimley", dob: "September 27, 1934", dod: null, image: "https://en.wikipedia.org/wiki/Wilford_Brimley#/media/File:Wilford_Brimley.jpg"},
  ]

server.get('/', (req, res) => {
  res.status(200).json('working!')
})

server.get('/api/dead_or_alive', (req, res) => {
  //send data with a few items. Name. birthdate. Image link, dead boolean? Brief info? .
  res.status(200).json(data)
})


server.post('/api/register', () => {
  const {name, password} = req.body
    if(name.length >= 1 && password.length >= 1) {
      //make a database insert
      // if db insert is a success then send a response

    } else {

    }





} )


module.exports = server;
// const port = process.env.PORT || 5000;

// server.listen(port, function() {
//   console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
// });
