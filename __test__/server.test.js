'use strict';
const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/modles/index');

// before any of the test create a connection
beforeAll(async () => {
  await db.sync();
});

describe('Web server', () => {
  // Check if 404 is handled 

  it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
  });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.patch('/food');
    expect(response.status).toBe(404);
  });

  // test if can create a food item
  it('can add a food item', async () => {
    const response = await mockRequest.post('/food').send({
      name: 'apple',
      calories: 100
    });
    expect(response.status).toBe(201);
  });

  // test if can read a food item
  it('can get all food items', async () => {
    const response = await mockRequest.get('/food');
    expect(response.status).toBe(200);

  });

  // test if can read one food item
  it('can get one record', async () => {
    const response = await mockRequest.get('/food/1');
    expect(response.status).toBe(200);
  });

  // test if can update a food item
  it('can update a record', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(201);
  });
  // test if can delete a food item
  it('can delete a record', async () => {
    const response = await mockRequest.delete('/food/1');
    expect(response.status).toBe(204);
  });
});
// after all the tests are done
afterAll(async () => {
  await db.drop();
});