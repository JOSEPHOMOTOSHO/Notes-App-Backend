import userModel from '../src/model/signupModel';
import mongoose from 'mongoose';
import app from '../src/app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';


// Connect to database memory before running any tests.
beforeAll(async () => await startConnection());
afterEach(async () => await clearConnectedDatabase());
afterAll(async () => await closeDatabaseConnection());

const userDetails = {
  email: 'chidimmaIfeh@gmail.com',
  password: '1234567890',
};

const token = jwt.sign(
  { user_email: userDetails.email },
  process.env.ACCESS_TOKEN_SECRET as string,
  {
    expiresIn: '30m',
  },
);


describe('TEST FOR ENDPOINT: FORGOT PASSWORD ROUTE', () => {

  test('User should be able to change Password with valid token', async () => {
    await request(app).get('/changePassword').set('token', token).expect(200);
    await request(app).get('/changePassword').expect(401);
  });



});
