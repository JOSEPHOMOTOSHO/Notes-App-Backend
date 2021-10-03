import express, { Request, Response, NextFunction } from "express";
import Folder from "../model/folderModel";
import Note from "../model/noteModel";
declare module "express" {
  interface Request {
      user?: any,
      isAuthenticated?:any,
  }
}
//Function to create notes
async function createNote(req: Request, res: Response, next: NextFunction) {
  // return res.send('klj')
  const  folderId  = req.params.folderId;
  // res.send(folderId)
  const { title, body, tags } = req.body;
  let user:{id?:string} = req.user
  try {
    const folderExist = await Folder.findById(folderId);
    console.log(folderExist);
    
    if (folderExist) {
      const note = {
        title,
        body,
        tags,
        folderId,
        createdBy : user.id
      };
      console.log(note)
      await Note.create(note)
      res.send('sucessfully added')
    }
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export default createNote;
