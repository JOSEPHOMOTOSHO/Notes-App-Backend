import request from 'supertest';
import app from '../src/app';
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';
import Note from '../src/model/noteModel';

beforeAll(async () => await startConnection());
afterAll(async () => await closeDatabaseConnection());

describe('', () => {
  test('Return an error message', async () => {
    const response = await request(app)
      .get('/note/615c4237d3474522adcbb11b/notes')
      .expect(404);

    expect(response.body).toEqual({ error: 'Collaborator has no notes' });
  });

  beforeEach(async () => {
    const note = await Note.create({
      _id: '615c97c4505966016389e959',
      title: 'Note Test',
      body: 'Testing the note',
      collaboratorId: ['615c4237d3474522adcbb11b'],
      tags: ['tests'],
      createdBy: '615c4237d3474522adcbb11b',
      folderId: '615c963c0d5d713b0397cc4a',
    });
  });

  test.only('Return all notes of the collaborator ', async () => {
    const response = await request(app)
      .get('/note/615c4237d3474522adcbb11b/notes')
      .expect(200);

    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('body');
  });
});
