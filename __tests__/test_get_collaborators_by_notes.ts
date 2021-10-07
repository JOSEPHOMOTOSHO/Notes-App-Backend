import request from 'supertest';
import app from '../src/app';
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';
import noteUsers from '../src/model/signupModel';
import Note from '../src/model/noteModel';
import folder from '../src/model/folderModel';

beforeAll(async () => await startConnection());
afterAll(async () => await closeDatabaseConnection());
let FolderId: any;
let userId: any;
let noteId: any;
let collaboratorId: any;


describe('', () => {
  test('Should throw an error for invalid parameters', async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        firstName: 'Dan',
        lastName: 'Dok',
        email: 'dokubodaniel@gmail',
        password: '123456789',
        confirm_password: '123456789',
      })
      .expect(404);

    expect(response.body).toHaveProperty('msg');
    expect(response.body).toEqual({
      msg: 'Please provide a valid email address',
    });

    // const user = await noteUsers.create({
    //   firstName: "Dan",
    //   lastName: "Dok",
    //   email: "dokubodaniel@gmail.com",
    //   password: "123456789",
    //   confirm_password: "123456789",
    // })
  });
  test('Should create user succesfully', async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        firstName: 'Dan',
        lastName: 'Dok',
        email: 'dokubodaniel@gmail.com',
        password: '123456789',
        confirm_password: '123456789',
      })
      .expect(201);

    // expect(response.body).toHaveProperty('_id')
  });

  test('Registered user should be able to login to create note', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'dokubodaniel@gmail.com',
        password: '123456789',
      })
      .expect(302);
      console.log(response.body, '*****')
  });

  // test.only('A non-registered user should not be able to login to create note', async()=>{
  //   const response = await request(app)
  //   .post('/users/login')
  //   .send({
  //     email: "ddk@gmail.com",
  //     password: "123456789"
  //   })
  //   .expect(400)

  //   expect(response.body).toHaveProperty("error")
  //   expect(response.body).toEqual("Email not in use")
  // })

  /*test('A signed in user should be able to create a folder', async()=>{
    const response = await request(app)
    .post('/notes/createFolder')
    .send({
      title: 'New folder',
      // createdBy: user._id
    })
    .expect(302)

    folderId = response._id

    // expect(response.body).toHaveProperty("createdAt")
  })*/

  test('Create Folder', async () => {
    const Folder = await folder.create({
      title: 'New folder',
      // createdBy: user._id,
    });

    FolderId = Folder._id;
  });
  test('Logged in user should be able to create a note', async () => {
    const note = await Note.create({
      title: 'newest note',
      body: 'sq008',
      tags: 'coding',
      // createdBy: userId._id,
    })
    noteId = note._id;

    // const note = await request(app)
    //   .post(`/notes/createNote/${projectId}`)
    //   .send({
    //     title: 'latest note',
    //     body: 'sq008',
    //     tags: 'coding',
    //     createdBy: user._id,
    //   })
    //   noteId = note._id
    //   .expect(200);
  });
  test('User should be unable to create a note if folder does not exist', async () => {
    const response = await request(app)
      .post(`/notes/createNote/xyz`)
      .send({
        title: 'latest note',
        body: 'sq008',
        tags: 'coding',
        // createdBy: user._id,
      })
      .expect(404);
  });
  test('Add collaborators', async () => {
    const collaborator = await request(app)
      .post(`/notes/invite/${noteId}`)
      .send({
        email: 'dokubodaniel@gmail.com',
      })
      .expect(201);
    // collaboratorId = collaborator.collaboratorId;
  });
  test('Get all collaborators for a note', async()=>{
    const response = await request(app)
    .get(`/notes/${noteId}/collaborators`)
    .expect(200)

    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("email")

  })
  
  test('Get all notes for a collaborator', async()=>{
    const response = await request(app)
    .get(`/notes/${collaboratorId}/notes`)
    .expect(200)

    expect(response.body).toHaveProperty("firstName")
    expect(response.body).toHaveProperty("lastName")
    expect(response.body).toHaveProperty("email")

  })
});
