import express, { Request, Response,  NextFunction } from 'express';
import folders from '../model/folderModel'
import notesUsers from '../model/signupModel'
import notes from '../model/notesModel'
// import express, { User } from 'express'


declare module "express" {
  interface Request {
    user?: any
      // isAuthenticated?:any,
  }
}


// create folders
export const createFolder = async (req: Request, res: Response) => { 
    //created by related to the user id from the usermodel/ schema
    const { _id: createdBy} = req.user as { [key: string]: string; };
    //title as folder name from the folder schema
    const { title } = req.body;
    try {
        // create a folder in the folder schema =====> database=====>having the createdby and title
      const folder = await folders.create({ createdBy, title });
      return res.status(201).json(folder);
     //unforseen errors...
    } catch (err: any) {
      const message = err.message || err;
      res.status(404).json({ error: message });
    }
  };

  //get a note
  export const getNote = async (req: Request, res: Response) => {
      //getting the req parameter and initilizing to the noteid
    const { _id } = req.params;
    //getting the user id from the request body
    // const { _id: createdBy } = req.user as { [key: string]: string; };
    try {
      const note = await notes.findById(_id);
      if (!note) return res.status(404).json({ error: "Note not found" });
      return res.status(200).json(note);
    } catch (err: any) {
      const message = err.message || err;
      return res.status(404).json({ error: message });
    }
  };


  //delete note
  export const trashNote = async (req: Request, res: Response) => {
    const {_id} = req.params;
 
    try {
      const note = await notes.findById(_id);
      
      if (!note) return res.status(404).json({ error: "Note not found" });
      const id = req.user!.id
      let owner:string = note.createdBy as unknown as string
      
      if(owner != req.user?.id) return res.status(404).json({ error: "You are not authorized to delete this note" });
      if(Boolean(note.softDelete) == true) return res.status(400).json({ error: "This Note has been deleted" });
      await notes.findByIdAndUpdate ( _id, {softDelete:true}, {new:true}) 
      res.status(200).json({message:"Note Successfully Deleted"})

    } catch (err: any) {
      const message = err.message || err;
      return res.status(404).json({ error: message });
    }
  };