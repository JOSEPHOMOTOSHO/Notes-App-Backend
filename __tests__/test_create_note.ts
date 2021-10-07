import userModel from '../src/model/signupModel';
import folders from '../src/model/folderModel';
import app from '../src/app';
import request from 'supertest';
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';

// Connect to database memory before running any tests.
beforeAll(async () => await startConnection());
//afterEach(async () => await clearConnectedDatabase());
afterAll(async () => await closeDatabaseConnection());

let folderId: any;
let user: any;

describe('TEST FOR ENDPOINT: CREATE NOTE ROUTE - POST /note/:folderId', () => {
  test('User should be registered to create a note', async () => {
    user = await userModel.create({
      firstName: 'Chi',
      lastName: 'Chi',
      email: 'chidimmaifeh@gmail.com',
      password: '123456789',
      confirm_password: '123456789',
    });
  });

  test('User should be loged in to create a note', async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'chidimmaifeh@gmail.com',
        password: '123456789',
      })
      .expect(302);
  });

  test('A user that is not logged in should not be able to create a folder', async () => {
    await request(app)
      .post(`/notes/createFolder`)
      .send({
        title: 'folder one',
      })
      .expect(302);
  });

  test('Creates a folder successfully', async () => {
    const folder = await folders.create({
      title: 'Folder one',
      createdBy: user._id,
    });

    folderId = folder._id;
  });

  test('User should be able to create a note if folder exist', async () => {
    await request(app)
      .post(`/notes/${folderId}`)
      .send({
        title: 'Note two',
        body: 'we are strong',
        tags: 'working',
        createdBy: user._id,
      })
      .expect(200);
  });

  test('User should be unable to create a note if folder does not exist', async () => {
    await request(app)
      .post(`/note/776egey6e`)
      .send({
        title: 'Note two',
        body: 'we are strong',
        tags: 'working',
        createdBy: user._id,
      })
      .expect(404);
  });
});
