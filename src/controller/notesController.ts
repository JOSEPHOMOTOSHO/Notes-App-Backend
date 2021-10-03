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
  const  folderId  = req.params.folderId;
  const { title, body, tags } = req.body;
  let user:{id?:string} = req.user
  let createdBy
  if(user) createdBy = user.id;
  else createdBy = req.body.createdBy

  try {
    const folderExist = await Folder.findById(folderId);    
    if (folderExist) {
      const note = {
        title,
        body,
        tags,
        folderId,
        createdBy
      };
      await Note.create(note)
      res.send('sucessfully added')
    }
  } catch (err: any) {
    console.log(err, 'err')
    res.status(404).json({
      error: err.message,
    });
  }
}

export default createNote;
