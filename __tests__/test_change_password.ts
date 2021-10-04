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


describe("TEST FOR CHANGE PASSWORD", ()=>{
    
    test("password change for valid user with correct old password", async ()=>{
        await request(app)
            .post("/users/login")
            .send({
                "email": "chidimmaifeh@gmail.com",
                "password": "12345678"
            })

        await request(app)
                .post("/users/changePassword")
                .send({ oldPassword:"12345678", newPassword: "87654321", confirmPassword: "87654321"})
                .expect(302)
    });

})
