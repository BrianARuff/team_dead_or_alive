
const request = require('supertest')
const server = require('../server.js')
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

beforeEach(async () => {
  await db('users').truncate()
  await db('quiz').truncate()
  await db('celebrity').truncate()
})

  describe('api/celebrity/:id GET', () => {
   it('should return status code 200', async () => {
      let data = await request(server).post('/api/celebrity')
        .send({name: 'name', date_of_birth: 'january 1, 1999', date_of_death: null, image_link: 'https://wikipedia.com'})
      let response = await request(server).get('/api/celebrity/1')
      expect(response.status).toBe(200)
    })

   it('should return an object to celeb data', async () => {
      let data = await request(server).post('/api/celebrity')
        .send({name: 'name', date_of_birth: 'january 1, 1999', date_of_death: null, image_link: 'https://wikipedia.com'})
      let response = await request(server).get('/api/celebrity/1')
      expect(response.body).toEqual([{id: 1, name: 'name', date_of_birth: 'january 1, 1999', date_of_death: null, image_link: 'https://wikipedia.com'}])
    })
  })

  describe('api/celebrity POST ', () => {
   it('should return the id of the new celebrity', async () => {
      let response = await request(server).post('/api/celebrity')
        .send({name: 'name', date_of_birth: 'january 1, 1999', date_of_death: null, image_link: 'https://wikipedia.com'})
       expect(response.body[0]).toBe(1)
    })

   it('Should return 422 if there is a missing name', async () => {
      let response = await request(server).post('/api/celebrity')
        .send({name: '', date_of_birth: 'January 1, 1999', date_of_death: null, image_link: 'https://wikipedia.com'})
       expect(response.status).toBe(422)
    })

   it('Should return 422 if there is a missing birthday', async () => {
      let response = await request(server).post('/api/celebrity')
        .send({ name: 'name', date_of_birth: '', date_of_death: null, image_link: 'https://wikipedia.com'})
       expect(response.status).toBe(422)
    })

   it('Should return a message if there is a duplicate', async () => {
      // let fakeUser = await request(server).post('/api/register').send({username: 'foobar', password: '123'})
      let first_celeb = await request(server).post('/api/celebrity')
        .send({name: 'name', date_of_birth: '', date_of_death: null, image_link: 'https://wikipedia.com'})
      let response = await request(server).post('/api/celebrity')
        .send({name: 'name', date_of_birth: '', date_of_death: null, image_link: 'https://wikipedia.com'})
       expect(response.status).toBe(422)
    })
  })
