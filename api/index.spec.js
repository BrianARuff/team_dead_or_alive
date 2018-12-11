const request = require('supertest')
const server = require('./server.js')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

beforeEach(async () => {
  await db('users').truncate()
  await db('quiz').truncate()

})

describe('server', () => {
  describe('/api/dead_or_alive  route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  })


  describe('/api/register route', () => {
   it('should return status code 201', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user123', password: 'password'})
       expect(response.status).toBe(201)
    })

     it('should return the ID number of the new resource', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(response.body[0]).toBe(1)
    })

    it('should return the status 422 if there is a missing username or password', async () => {
      let response = await request(server).post('/api/register')
        .send({username: '', password: ''})
       expect(response.status).toBe(422)
    })

    it('should return a message if there is a duplicate of the username', async () => {
      let fakeUser = await request(server).post('/api/register').send({username: 'foobar', password: '123'})
      let response = await request(server).post('/api/register').send({username: 'foobar', password: '123'})
      expect(response.message).toEqual("There is already a user registered by that name")
    })

    it.skip('should return a jwt so that the user is logged in after ame or password', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(typeof response.token).toBe('string')
    })
  })

  describe('/api/ login route', ()=> {
    it('should return status code 200', async () => {
      const loggedInUser = await request(server).post('/api/register').send({username: 'chad', password: '123'})
      let response = await request(server).post('/api/login')
        .send({username: 'chad', password: '123'})
       expect(response.status).toBe(200)
    })

    it('should return the status 422 if there is a missing username or password', async () => {
      let response = await request(server).post('/api/login')
        .send({username: '', password: ''})
       expect(response.status).toBe(422)
    })

    it('should return a jwt so that the user is logged in', async () => {
      const loggedInUser = await request(server).post('/api/register').send({username: 'chad', password: '123'})
      let response = await request(server).post('/api/login')
        .send({username: 'chad', password: '123'})
       expect(typeof response.body.token).toBe('string')
    })
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
})
