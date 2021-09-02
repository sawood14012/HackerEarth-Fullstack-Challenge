const request = require('supertest')
const app = require('../app')
  describe('Delete Endpoint', () => {
    it('When i make a DELETE request to the delete endpoint with invlid id', async () => {
      const res = await request(app)
        .delete('/delete/igg')
      expect(res.statusCode).toEqual(404)
    })
    it('When i make a get request to the delete endpoint with invlid id', async () => {
        const res = await request(app)
          .get('/delete/igg')
        expect(res.statusCode).toEqual(404)
    })
    it('When i make a post request to the delete endpoint with invlid id', async () => {
        const res = await request(app)
          .post('/delete/igg')
        expect(res.statusCode).toEqual(404)
    })
    it('When i make a put request to the delete endpoint with invlid id', async () => {
        const res = await request(app)
          .put('/delete/igg')
        expect(res.statusCode).toEqual(404)
    })
  });
  