const request = require('supertest')

const server = require('./index.js')

describe('server', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  })


  describe('/api/register route', () => {
    it('should return status code 201', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(response.status).toBe(201)
    })

    it('should return the ID number of the new resource', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(typeof response.body).toBe('number')
    })

    it('should return the status 422 if there is a missing username or password', async () => {
      let response = await request(server).post('/api/register')
        .send({username: '', password: ''})
       expect(response.status).toBe(422)
    })

    it.skip('should return a jwt so that the user is logged in after ame or password', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(response.body).toBe('string')
    })
  })

  describe('/api/ login route', ()=> {
    it('should return status code 200', async () => {
      let response = await request(server).post('/api/login')
        .send({username: 'user', password: 'password'})
       expect(response.status).toBe(200)
    }) 

    it('should return the status 422 if there is a missing username or password', async () => {
      let response = await request(server).post('/api/login')
        .send({username: '', password: ''})
       expect(response.status).toBe(422)
    })

    it('should return a jwt so that the user is logged in', async () => {
      let response = await request(server).post('/api/register')
        .send({username: 'user', password: 'password'})
       expect(response.body).toBe('string')
    })
  })
})
