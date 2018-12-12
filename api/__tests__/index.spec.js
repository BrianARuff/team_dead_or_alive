const request = require('supertest')
const server = require('../server.js')
const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)

beforeEach(async () => {
  await db('users').truncate()
  await db('quiz').truncate()
  await db('celebrity').truncate()
})

describe('server', () => {
  describe('/api/dead_or_alive  route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  })


})
