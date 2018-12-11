const infoBox = require('wiki-infobox')


getCeleb = (name) => {
  return new Promise((resolve, reject) => {
    infoBox(name, 'en', (err, data) => {
      if(!err) {
       return resolve(data)
      } else {
        return reject(err)
      }
    })
  }, 500)
}



module.exports = {


}

let thing;

getCeleb('Stan Lee').then(res => {
  thing = res
} ).catch(err => console.log(err))
// console.log(getCeleb('Stan Lee'))
console.log('data?', thing)
