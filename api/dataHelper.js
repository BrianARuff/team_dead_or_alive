const infoBox = require('wiki-infobox')


getCeleb = (name) => {
  return new Promise((resolve, reject) => {
    infoBox(name, 'en', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }, 1000)
}



module.exports = {


}

let thing;

getCeleb('Stan Lee').then(response => {
  //what do you do with the response
  thing = response
} ).catch(err => console.log(err))


console.log('this is the data', thing)
