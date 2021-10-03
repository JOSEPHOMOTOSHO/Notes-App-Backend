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
import sendEmail from '../src/nodemailer'

// Connect to database memory before running any tests.
beforeAll(async () => await startConnection());
afterEach(async () => await clearConnectedDatabase());
afterAll(async () => await closeDatabaseConnection());

const userDetails = {
  email: 'chidimmaIfeh@gmail.com',
  password: '1234567890',
  _id: "123456789011"
};



const token = jwt.sign(
    { userId: userDetails._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '24h' },
);
    
const Email = "chidimmaifeh@gmail.com";
    const link = `localhost:3000/users/reset/${token}`;
    const body = `
    <div>Click the link below to reset your password</div><br/>
    <div>${link}</div>
`;
    
describe('TEST FOR ENDPOINT: FORGOT PASSWORD ROUTE - POST /password/recovery-email', () => {
    test("if email not exist in database", async () => {
            await request(app)
        .post(`/users/recovery-email`)
        .send({
          "email": "chidimmaifeh@gmail.com"
        })
        .expect(404)
    });
    
    test('User should be able to reset Password if email exist', async () => {
        await userModel.create({
            firstName: "Chi",
            lastName: "Chi",
            email: "chidimmaifeh@gmail.com",
            password: "123456789"
        })
    
        await request(app)
        .post("/users/recovery-email")
        .send({ email: 'chidimmaifeh@gmail.com'})
        .expect(200)
    });
    
    test('User should be unable to reset Password if email is invalid', async () => {
        await request(app)
        .post("/users/recovery-email")
        .send({ email: 'c@g.c'})
        .expect(404)
    });
    
});

describe('TEST FOR ENDPOINT: FORGOT PASSWORD ROUTE - POST /password/reset/', () => {
    test('User should be unable to reset Password if token is invalid', async () => {
    await request(app)
    .get("/users/reset/")
    .send({
        "password":"12345678",
        "confirmPassword":"12345678",
        "token":"eyJhbGciOCJpYXQiOjE2K-sGn83nMl_ELavHeoVA"
    })
    .expect(404)
    });
    
    test('User should be unable to reset Password if password does not match', async () => {
        await request(app)
        .post("/users/reset")
        .send({ token: null,
            password: "1888889", 
            confirmPassword: "12345678"})
            .expect(400)
    });
    
});


describe('TEST FOR ENDPOINT: FORGOT PASSWORD ROUTE - GET /reset/:token', () => {
    test("verify token is valid", async () => {
        await request(app)
        .get(`/reset/:${token}`)
        .send({
          "email": "chidimmaifeh@gmail.com"
        })
        .expect(404)
    })

    test("Unable to verify token is valid", async () => {
        await request(app)
        .get(`/reset/:${token}`)
        .send({
          "email": "chidimmaifeh@gmail.com"
        })
        .expect(404)
    })    
});    

