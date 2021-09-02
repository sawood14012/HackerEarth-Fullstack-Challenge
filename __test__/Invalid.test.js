const request = require('supertest')
const app = require('../app')
describe('Get Endpoints - Negative', () => {
    it('I should be able to make a get request to /show/:id endpoint with invalid id', async () => {
      const res = await request(app)
        .get('/show/very-invalid-id');
      expect(res.statusCode).toEqual(404)
      expect(res.text).toEqual("No such document!")
    })
    it('I should be able to make a get request to /:id/edit endpoint  with invalid id', async () => {
      const res = await request(app)
        .get('/invalid-id/edit');
      expect(res.statusCode).toEqual(404)
      expect(res.text).toEqual("No such document!")
    })
    describe('Positive points should not give an 404 status', ()=>{
      it('I should be able to make a get request to / endpoint and not get 404', async () => {
        const res = await request(app)
          .get('/');
        expect(res.statusCode).not.toEqual(404)
      })
      it('I should be able to make a get request to /new endpoint and not get 404', async () => {
        const res = await request(app)
          .get('/new');
        expect(res.statusCode).not.toEqual(404)
      })
      it('I should be able to make a get request to /show/:id endpoint and not get 404', async () => {
        const res = await request(app)
          .get('/show/63d17ed1-1944-4bd8-b16b-4c47b028f32d');
        expect(res.statusCode).not.toEqual(404)
      })
      it('I should be able to make a get request to /:id/edit endpoint and not get 404', async () => {
        const res = await request(app)
          .get('/63d17ed1-1944-4bd8-b16b-4c47b028f32d/edit');
        expect(res.statusCode).not.toEqual(404)
      })
    })
    describe('Index route method test', () => {
      it('when i make a put request to / endpoint i should get 404', async () => {
        const res = await request(app)
          .put('/');
        expect(res.statusCode).toEqual(404)
      })
      it('when i make a patch request to / endpoint i should get 404', async () => {
        const res = await request(app)
          .patch('/');
        expect(res.statusCode).toEqual(404)
      })
      it('when i make a delete request to / endpoint i should get 404', async () => {
        const res = await request(app)
          .delete('/');
        expect(res.statusCode).toEqual(404)
      })
    })
    describe('Bad Request -POST/PUT', () => {
      it('when i make a post request to / endpoint without data i should get 400', async () => {
        const res = await request(app)
          .post('/');
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("There is no body present")
      })
      it('when i make a post request to / endpoint with invalid data i should get 400', async () => {
        const res = await request(app)
          .post('/').send(
            {
              ImgName: '',
              ImgURL: '',
              ImgDetails: ''
            }
          );
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Invalid Values! please enter proper values!")
      })
      it('when i make a put request to /:id/edit endpoint without data i should get 400', async () => {
        const res = await request(app)
          .put('/63d17ed1-1944-4bd8-b16b-4c47b028f32d/edit');
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("There is no body present")
      })
      it('when i make a put request to /:id/edit endpoint with invalid data i should get 400', async () => {
        const res = await request(app)
          .put('/63d17ed1-1944-4bd8-b16b-4c47b028f32d/edit').send(
            {
              ImgName: '',
              ImgURL: '',
              ImgDetails: ''
            }
          );
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Invalid Values! please enter proper values!")
      })
    })
  })
