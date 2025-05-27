// const request = require('supertest');
// const express = require('express');
// const User = require('../models/user');

// const app = express();

// jest.mock('../models/user');

// describe('GET /api/users', () => {


// it('should return an empty array when there are no users in the database', async () => {
//   User.find.mockResolvedValue([]);

//   const res = await request(app).get('/api/users');

//   expect(res.status).toBe(200);
//   expect(User.find).toHaveBeenCalledWith({});
//   expect(console.log).toHaveBeenCalledWith('All Users:', []);
// });
// });
