const request = require('supertest')
const server = require('../server.js')
const knex = require('knex')
const knexConfig = require('../knexfile.js')
const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

beforeEach(async () => {
  await db('users').truncate()
  await db('quiz').truncate()
  await db('celebrity').truncate()
})

  describe('/api/quiz POST  quiz data', () => {
    it('Should return a 201', async () => {
      let response = await request(server).post('/api/quiz')
        .send({user_id: 1, name: 'New quiz name'})
       expect(response.status).toBe(201)
    })

    it('Should return the id of the new quiz ', async () => {
      let response = await request(server).post('/api/quiz')
        .send({user_id: 2, name: 'New quiz name2'})
       expect(response.body[0]).toBe(1)
    })

    it('Should return 422 if there is a missing name', async () => {
      let response = await request(server).post('/api/quiz')
        .send({user_id: 2, name: ''})
       expect(response.status).toBe(422)
    })

  })

// describe('/api/quiz/:id  post to  request'< () => {
//     it('Should return 200 after adding celebs to quiz', async () => {
//       let response = await request(server).post('/api/quiz/1')
//         .send({})
//        expect(response.status).toBe(422)
//     })