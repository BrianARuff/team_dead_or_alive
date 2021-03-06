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

describe('server', () => {
  describe('/api/dead_or_alive  route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/dead_or_alive')
      expect(response.status).toBe(200)
    })
  })


})
