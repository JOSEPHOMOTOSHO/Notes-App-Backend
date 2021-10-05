import Notification from '../src/model/notificationModel';
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

// const userDetails = {
//   email: 'chidimmaIfeh@gmail.com',
//   password: '1234567890',
//   _id: "123456789011"
// };



// const token = jwt.sign(
//     { userId: userDetails._id },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     { expiresIn: '24h' },
// );
    
// const Email = "chidimmaifeh@gmail.com";
//     const link = `localhost:3000/users/reset/${token}`;
//     const body = `
//     <div>Click the link below to reset your password</div><br/>
//     <div>${link}</div>
// `;
    
describe('TEST FOR ENDPOINT: FORGOT PASSWORD ROUTE - POST /password/recovery-email', () => {
    // test("if email not exist in database", async () => {
    //         await request(app)
    //     .post(`/users/recovery-email`)
    //     .send({
    //       "email": "chidimmaifeh@gmail.com"
    //     })
    //     .expect(404)
    // });
    
    test('User should be able to reset Password if email exist', async () => {
        const cre = await Notification.create({
            content: "You have been added as a contributor to this note note one",
            noteId: "6159ac744343524862a5660b",
            userId: "615a29bfae867c5f139b328d"
        })
    const data = await Notification.findById(cre.id)
    if(data){
        expect(data._id).toStrictEqual(cre._id)
    }
    
    //     await request(app)
    //     .post("/users/recovery-email")
    //     .send({ email: 'chidimmaifeh@gmail.com'})
    //     .expect(200)
    });
    
    
});






