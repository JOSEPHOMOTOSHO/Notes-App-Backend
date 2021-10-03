import userModel from '../src/model/signupModel';
import Note from '../src/model/noteModel'
import mongoose from 'mongoose';
import app from '../src/app';
import Folder from '../src/model/folderModel'
import request from 'supertest';
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';

// Connect to database memory before running any tests.
beforeAll(async () => await startConnection());
afterEach(async () => await clearConnectedDatabase());
afterAll(async () => await closeDatabaseConnection());

describe('TEST FOR ENDPOINT: CREATE NOTE ROUTE - POST /note/:folderId', () => {
    
    test('User should be logged in to create a note', async () => {
        await userModel.create({
            firstName: "Chidimma",
            lastName: "Ifeh",
            email: "chidimmaifeh@gmail.com",
            password: "123456789"
        });

        await request(app)
        .post("/users/login")
        .send({
            "email": "chidimmaifeh@gmail.com",
            "password": "123456789"
        });
        .expect(200);
    });

    test("A logged in user should be able to create a folder", async () => {
        await request(app)
        .post(`/folder/:${userId}`)
        .send({
            title,
            userId
        });
        .expect(200)
    });   
    
    test("A user that is not logged in should not be able to create a folder", async () => {
        await request(app)
        .post(`/folder/:${userId}`)
        .send({
            title,
            userId
        });
        .expect(401)
    });   

    test("User should be able to create a note if folder exist", async () => {
        await request(app)
        .post(`/note/:${folderId}`)
        .send({
            title,
            body,
            tags,
            folderId,
        });
        .expect(200)
    }); 

    test("User should be unable to a note if folder does not exist", async () => {
        await request(app)
        .post(`/note/:${folderId}`)
        .send({
            title,
            body,
            tags,
            folderId,
        });
        .expect(404)
    }); 
        
});

