const request = require('supertest');
const app = require('../src/app');

describe('GET /api/services', () => {
  it('should return 200 and array', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
