const request = require('supertest')
const app = require('../app')
  describe('Get Endpoints - Positive', () => {
    it('I should be able to make a get request to / endpoint', async () => {
      const res = await request(app)
        .get('/')
      expect(res.statusCode).toEqual(200)
    })
    it('I should be able to make a get request to /new endpoint', async () => {
      const res = await request(app)
        .get('/new');
      expect(res.statusCode).toEqual(200)
    })
    it('I should be able to make a get request to /show/:id endpoint', async () => {
      const res = await request(app)
        .get('/show/63d17ed1-1944-4bd8-b16b-4c47b028f32d');
      expect(res.statusCode).toEqual(200)
    })
    it('I should be able to make a get request to /:id/edit endpoint', async () => {
      const res = await request(app)
        .get('/63d17ed1-1944-4bd8-b16b-4c47b028f32d/edit');
      expect(res.statusCode).toEqual(200)
    })
  });
  