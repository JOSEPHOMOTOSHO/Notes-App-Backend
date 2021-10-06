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

//const  folderId  = req.params.folderId; 

const token = jwt.sign(
      { userId: userDetails._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '24h' },
  );
            
describe('TEST FOR ENDPOINT: CREATE NOTE ROUTE - POST /note/:folderId', () => {
        test('User should be registered to create a note', async () => {
          await userModel.create({
              firstName: "Chi",
              lastName: "Chi",
              email: "chidimmaifeh@gmail.com",
              password: "123456789",
              confirm_password: "123456789"
          })
        });

    test("A user that is not logged in should not be able to create a folder", async () => {
            await request(app)
            .post(`/folder/create`)
            .send({
                title: "folder one"
            });
            //.expect(401)
        }); 

    test("User should be loged in to create a note", async ()=>{
        await request(app)
            .post("/users/login")
            .send({
                "email": "chidimmaifeh@gmail.com",
                "password": "123456789"
            })
    });

    test("A logged in user should be able to create a folder", async () => {
        await request(app)
        .post(`/folder/create`)
        .send({
            title: "folder one"
        });
        //.expect(200)
    });   
    
    test("User should be able to create a note if folder exist", async () => {
        await request(app)
        .post(`/note/${userDetails._id}`)
        .send({
            title: "Note two",
            body: "we are strong",
            tags: "working",
            createdBy : userDetails._id
        });
        //.expect(200)
    }); 

    test("User should be unable to create a note if folder does not exist", async () => {
        await request(app)
        .post(`/note/${userDetails._id}`)
        .send({
            title: "Note two",
            body: "we are strong",
            tags: "working",
            createdBy : userDetails._id
        });
        //.expect(404)
    }); 
      
  });


