import supertest from "supertest";
import {beforeAll, afterEach, afterAll, describe, test, expect} from "@jest/globals";
import {
    startConnection,
    clearConnectedDatabase,
    closeDatabaseConnection,
  } from '../mongodb_memory_server/database_memory';
  import app from '../src/app';
import Notification from '../src/model/notificationModel';
import notesusers from '../src/model/signupModel';
let request = supertest.agent();

import { signToken } from '../src/middleware/joi';
import userModel from '../src/model/signupModel'
import { resetPasswordLink } from '../src/controller/users'
import jwt from 'jsonwebtoken'

import sendEmail from '../src/nodemailer'
// import {beforeAll, afterEach, afterAll, describe, test, expect} from "@jest/globals";


// Connect to database memory before running any tests.
beforeAll(async () => {
    request = supertest.agent(app);
    await startConnection()
});
// afterEach(async () => await clearConnectedDatabase());
afterAll(async () => await closeDatabaseConnection());
describe("TEST FOR CHANGE PASSWORD", () => {
    // test("Password does not match for a new user", async() => {
    //     const sampleData = {
    //       firstName:"Sunday",
    //       lastName:"Mba",
    //       email: "sunday@gmail.com",
    //       password: "123456783",
    //       confirm_password:"123456738"
    //     }
    //     await request(app)
    //     .post("/users/signup")
    //     .send(sampleData)
    //     .set("Accept", "application/json")
    //     .expect(404)
    //     .expect((res) => {
    //       expect(res.body.msg).toBe("Password do not match")
    //     })
    // })
    // test("Invalid email for a new user", async() => {
    //     const sampleData = {
    //       firstName:"Sunday",
    //       lastName:"Mba",
    //       email: "su@g.com",
    //       password: "123456783",
    //       confirm_password:"123456783"
    //     }
    //     await request(app)
    //     .post("/users/signup")
    //     .send(sampleData)
    //     .set("Accept", "application/json")
    //     .expect(404)
    //     .expect((res) => {
    //       expect(res.body.msg).toBe("Please provide a valid email address")
    //     })
    // });
    // test("Successful creation of a new user", async() => {
    //     const sampleData = {
    //       firstName:"Sunday",
    //       lastName:"Mba",
    //       email: "christian.mgbekwute@decagon.dev",
    //       password: "123456783",
    //       confirm_password:"123456783"
    //     }
    //     await request(app)
    //     .post("/users/signup")
    //     .send(sampleData)
    //     .set("Accept", "application/json")
    //     .expect(201)
    //     .expect((res) => {
    //       expect(res.body.msg).toBe("A mail has been sent to you for verification!!!")
    //     })
    // })
    test("Successful confirmation of a new user", async() => {
        const sampleData = {
            firstName:"Sunday",
            lastName:"Mba",
            email: "christian.mgbekwute@decagon.dev",
            password: "123456783",
        }
        let token = await signToken(sampleData);
        await request
        .get(`/users/confirm/${token}`)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe("Created Successful!!!")
        })
      })
    //   test("if email does not exist in database", async () => {
    //     await request(app)
    //     .post(`/users/recovery-email`)
    //     .send({email: "christian.mgbekwutedecagon.dev"})
    //     .expect(404)
    // });
    // test('User should be able to reset Password if email exist', async () => {
    //     await request(app)
    //     .post("/users/recovery-email")
    //     .send({ email: 'christian.mgbekwute@decagon.dev'})
    //     .expect(200)
    // });
    // test("verify token is valid", async () => {
    //     let user = userModel.find({email: 'christian.mgbekwute@decagon.dev'})
    //     const token = jwt.sign(
    //         { userId: user._id },
    //         process.env.ACCESS_TOKEN_SECRET as string,
    //         { expiresIn: '24h' },
    //         );
    //     await request(app)
    //     .get(`/reset/:${token}`)
    //     .send({
    //       "email": "chidimmaifeh@gmail.com"
    //     })
    //     .expect(200)
    // })
    // test("Unable to verify token is valid", async () => { 
    //     const token = "dhddjddjdj"
    //     await request(app)
    //     .get(`/reset/:${token}`)
    //     .send({
    //       "email": "chidimmaifeh@gmail.com"
    //     })
    //     .expect(404)
    // })    
      test("Successful log in of a user", async() => {
        const sampleData = {
          email: "christian.mgbekwute@decagon.dev",
          password: "123456783",
        }
        await request
        .post("/users/login")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(302)
        .expect((res) => {
          expect(res.headers.location).toBe('/users/profile/')
        })
    })
    // test("Unsuccessful login of a user with wrong password or email", async() => {
    //     const sampleData = {
    //       email: "christian.mgbekwutedecagon.dev",
    //       password: "1234678",
    //     }
    //     await request(app)
    //     .post("/users/login")
    //     .send(sampleData)
    //     .set("Accept", "application/json")
    //     .expect(302)
    //     .expect((res) => {
    //       expect(res.headers.location).toBe('/users/login')
    //     })
    // })
    test("password change for valid user with correct old password", async ()=>{
        await request
            .post("/users/changePassword")
            .send({ 
                oldPassword:"123456783", 
                newPassword: "1234567890", 
                confirmPassword: "1234567890"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Password change successful")
                // console.log(res.body)
            });
    })

    //  test("password change for valid user with correct old password", async ()=>{
    //     await request
    //         .get("/notes/testss")
    //         // .expect(200)
    //         .expect((res) => {
    //             // expect(res.body.msg).toBe("Password change successful")
    //             console.log(res)
    //         });
    // })
})