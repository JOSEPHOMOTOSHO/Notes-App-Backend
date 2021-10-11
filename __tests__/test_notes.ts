import app from '../src/app';
import supertest from 'supertest';
import { collabToken, signToken } from '../src/middleware/joi';
import userModel from '../src/model/signupModel'
import jwt from 'jsonwebtoken'
import {beforeAll, afterEach, afterAll, describe, test, expect} from "@jest/globals";
import {
  startConnection,
  clearConnectedDatabase,
  closeDatabaseConnection,
} from '../mongodb_memory_server/database_memory';

let request = supertest.agent()

beforeAll(async () => {
    request = supertest.agent(app)
    await startConnection()
},10000);
afterAll(async () => await closeDatabaseConnection());


let id: string;
describe("TEST FOR NOTES", () => {
    test("Password does not match for a new user", async() => {
        const sampleData = {
          firstName:"Sunday",
          lastName:"Mba",
          email: "sunday@gmail.com",
          password: "123456783",
          confirm_password:"123456738"
        }
        await request
        .post("/users/signup")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(404)
        .expect((res) => {
          expect(res.body.msg).toBe("Password do not match")
        })
    })

    test("Invalid email for a new user", async() => {
       
        const sampleData = {
          firstName:"Sunday",
          lastName:"Mba",
          email: "su@g.com",
          password: "123456783",
          confirm_password:"123456783"
        }
        await request
        .post("/users/signup")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(404)
        .expect((res) => {
          expect(res.body.msg).toBe("Please provide a valid email address")
        })
    });

    test("Successful creation of a new user", async() => {
        const sampleData = {
          firstName:"Sunday",
          lastName:"Mba",
          email: "christian.mgbekwute@decagon.dev",
          password: "123456783",
          confirm_password:"123456783"
        }
        await request
        .post("/users/signup")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe("A mail has been sent to you for verification!!!")
        })
    })

    test("Successful creation of new user2", async() => {
        const sampleData = {
            firstName:"Chi",
            lastName:"Chi",
            email: "chidimma.ifeh@decagon.dev",
            password: "123456789",
          confirm_password:"123456789"
        }
        await request
        .post("/users/signup")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe("A mail has been sent to you for verification!!!")
        })
    })

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

    test("Successful confirmation of new user2", async() => {
        const sampleData = {
            firstName:"Chi",
            lastName:"Chi",
            email: "chidimma.ifeh@decagon.dev",
            password: "123456789",
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

    test("if email does not exist in database", async () => {
        await request
        .post(`/users/recovery-email`)
        .send({email: "christian@decagon.dev"})
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('User not found')
        })
    });
    
    test('User should be able to reset Password if email exist', async () => {
        await request
        .post("/users/recovery-email")
        .send({ email: 'christian.mgbekwute@decagon.dev'})
        .expect(200)
    });

    test("verify token is valid", async () => {
        let user = await userModel.findOne({email: 'christian.mgbekwute@decagon.dev'})
        const token = await jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '24h' },
            );
        await request
        .post('/users/reset')
        .send({
          password: "12345678",
          confirmPassword: "12345678",
          token: token
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Password reset successful')
        })
    })
    

    test("Successful log in of a user", async() => {
        const sampleData = {
          email: "christian.mgbekwute@decagon.dev",
          password: "12345678",
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

    test("Unsuccessful login of a user with wrong password or email", async() => {
        const sampleData = {
          email: "christian.mgbekwutedecagon.dev",
          password: "1234678",
        }
        await request
        .post("/users/login")
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(302)
        .expect((res) => {
          expect(res.headers.location).toBe('/users/login')
        })
    })

    test("password change for valid user with correct old password", async ()=>{
        await request
            .post("/users/changePassword")
            .send({ 
                oldPassword:"12345678", 
                newPassword: "1234567890", 
                confirmPassword: "1234567890"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.message).toBe("Password change successful")
            });
    })

    test("Successfully update of user", async() => {
        let user = await userModel.findOne({email: 'christian.mgbekwute@decagon.dev'})
        const sampleData = {
            firstName:"Monday",
        }
        await request
        .put(`/users/${user._id}`)
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.message).toBe("Profile updated successfully!")
        })
    })

    test("A logged in user should be able to create a folder", async () => {
        await request
        .post("/notes/createFolder")
        .send({
            title: "folder one"
        })
        .expect(201)
        .expect((res) => {
            expect(res.body.message).toBe("Folder created successfully")
        })
    });  

    test("A user should not be able to create a folder with empty field", async () => {
        await request
        .post("/notes/createFolder")
        .send({ })
        .expect(404)
    }); 

    test("User should be able to create a note if folder exist", async () => {
        let newFolder = await request.post("/notes/createFolder").send({title:"testFolders"})
        let FolderId = newFolder.body.folder._id
        await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            title: "Note two",
            body: "we are strong",
            tags: "working"
        })
        .expect(201)
        .expect((res) => {
            id=res.body.noteCreated._id
            expect(res.body.message).toBe("Notes created successfully")
        })  
    }); 

    test("User should be unable to create a note if folder does not exist", async () => {
        let newFolder = await request.post("/notes/createFolder").send({title:"testFolder"})
        let FolderId = newFolder.body
        await request
        .post(`/notes/${FolderId}`)
        .send({
            title: "Note two",
            body: "we are strong",
            tags: "working"
        })
        .expect(404)
    }); 

    test("Successful invite a new collaborator", async() => {
        const sampleData = {
          email: "chidimma.ifeh@decagon.dev",
        }
        await request
        .post(`/notes/invite/${id}`)
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe('Notification Sent')
        })
    })

    test("Trying to invite an already existing collaborator", async() => {
        const sampleData = {
          email: "chidimma.ifeh@decagon.dev",
        }
        await request
        .post(`/notes/invite/${id}`)
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(404)
        .expect((res) => {
          expect(res.body.msg).toBe('Already a Collaborator')
        })
    })

    test("Successful invite a new user as a collaborator", async() => {
        const sampleData = {
          email: "chiemerie.anebo@decagon.dev",
        }
        await request
        .post(`/notes/invite/${id}`)
        .send(sampleData)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe('A mail has been sent to you to register!!!')
        })
    })

    test("Successful confirm a collaborator", async() => {
        const sampleData = {
          email: "chiemerie.anebo@decagon.dev",
          id
        }
        let token = await collabToken(sampleData);
        await request
        .post(`/notes/collab/${token}`)
        .send({
            firstName: "chiemerie", 
            lastName: "anebo", 
            password: "1234567", 
            confirm_password: "1234567"
        })
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe('Created Successful!!!')
        })
    })

    test("get Notifications", async() => {
        const sampleData = {
            email: "chidimma.ifeh@decagon.dev",
            password: "123456789",
          }
          await request
          .post("/users/login")
          .send(sampleData)
          .set("Accept", "application/json")
        
        await request
        .get("/notes/getNotification")
        .set("Accept", "application/json")
        .expect(200)
        .expect((res) => {
            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length).toBeGreaterThan(0)
        })
    })
    test("Successful removal as collaborator", async() => {
        await request
        .get(`/notes/remove/${id}`)
        .set("Accept", "application/json")
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe('Removed Successful!!!')
        })
    })

    test("Successful removal of a collaborator that is not a user", async() => {
        await request 
        .post(`/notes/admin/remove/${id}`)
        .set("Accept", "application/json")
        .send({email:"chiemerieanebo@decagon.dev"})
        .expect(404)
        .expect((res) => {
          expect(res.body.error).toBe("Not a user")
        })
    })

    test("Successful removal as collaborator", async() => {
        await request
        .post(`/notes/admin/remove/${id}`)
        .set("Accept", "application/json")
        .send({email:"chiemerie.anebo@decagon.dev"})
        .expect(201)
        .expect((res) => {
          expect(res.body.msg).toBe('Removed Successful!!!')
        })
    })

    test("get all note", async() => {
        let newFolder = await request.post("/notes/createFolder").send({title:"testFolder5"})
        let FolderId = newFolder.body.folder._id
        let note = await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            "title":"newww", 
            "body" : "how far", 
            "tags" : ["yeah"] 
        })
    
        let note2 = await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            "title":"test note 2", 
            "body" : "how far", 
            "tags" : ["yeah"] 
        })
        let note3 = await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            "title":"test note 3", 
            "body" : "how far", 
            "tags" : ["yeah"] 
        })
        
        await request
        .get(`/notes/getAllNote/${FolderId}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body.length).toBe(3)
        })
    })

    test("Get a note", async() => {
        let newFolder = await request.post("/notes/createFolder").send({title:"testFolder6"})
        let FolderId = newFolder.body.folder._id
        let note = await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            "title":"newww1", 
            "body" : "how far", 
            "tags" : ["yeah"] 
        })

        let noteId = note.body.noteCreated._id

        await request
        .get(`/notes/${noteId}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect((res) => {
            expect(res.body).toHaveProperty('title','newww1')
            expect(res.body).toHaveProperty('body','how far')
        })
    })

    test('Get all collaborators on a note', async()=>{
      await request
      .get(`/notes/${id}/collaborators`)
      .set('Accept', 'application/json')
      .expect(200)
    })
    test('Get all notes of a collaborator', async()=>{
      await request
      .get(`/notes/collaborators/notes`)
      .set('Accept', 'application/json')
      .expect(200)
    })

    test("Delete a note", async() => {
        let newFolder = await request.post("/notes/createFolder").send({title:"testFolderz"})
        let FolderId = newFolder.body.folder._id
        let note = await request
        .post(`/notes/createNote/${FolderId}`)
        .send({
            "title":"newww1", 
            "body" : "how far", 
            "tags" : ["yeah"] 
        })

        let noteId = note.body.noteCreated._id

        await request
        .get(`/notes/delete/${noteId}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('Note Successfully Deleted')
        })
    })
    test("Edit a note", async() => {
      let newFolder = await request.post("/notes/createFolder").send({title:"edit note folder"})
      let FolderId = newFolder.body.folder._id
      let note = await request
      .post(`/notes/createNote/${FolderId}`)
      .send({
          "title":"edit note", 
          "body" : "how far", 
          "tags" : ["yeah"] 
      })

      let noteId = note.body.noteCreated._id

      await request
      .put(`/notes/editnote/${noteId}`)
      .send({body:"new body",tags:["new","note"]})
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Note has been sucessfully updated')
      })

      await request
      .get(`/notes/${noteId}`)
      .set("Accept", "application/json")
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('body')
        expect(res.body.body).toBe('new body')
        expect(res.body.tags).toStrictEqual(["new","note"])
      })
  })
})