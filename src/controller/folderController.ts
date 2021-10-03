import express, { Request, Response, NextFunction } from 'express';
import folders from '../model/folderModel'
import notesUsers from '../model/signupModel'


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

//   //get a note
//   export const getNote = async (req: Request, res: Response) => {
//       //getting the req parameter and initilizing to the noteid
//     const { noteId } = req.params;
//     //getting the user id from the request body
//     const { _id: createdBy } = req.user as { [key: string]: string; };
//     try {
//       const note = await Note.findById(noteId);
//       if (!note) return res.status(404).json({ error: "Note not found" });
//       return res.status(200).json(note);
//     } catch (err: any) {
//       const message = err.message || err;
//       return res.status(404).json({ error: message });
//     }
//   };


//   //delete note
//   export const trashNote = async (req: Request, res: Response) => {
//     const { noteId } = req.params;
//     const { _id: userId } = req.user as { [key: string]: string; };
//     try {
//       const note = await Note.findById(noteId);
//       if (!note) return res.status(404).json({ error: "Note not found" });
//       if (note.userId !== userId) return res.status(404).json({ error: "Unauthorized request" });
//       const deleteNote = await note.remove();
//       const { folderId, title, body, fileUrl, tag, collaborators } = deleteNote;
//       const trashed = await Trash.create({ folderId, title, body, userId, fileUrl, tag, collaborators });
//       return res.status(200).json(trashed);
//     } catch (err: any) {
//       const message = err.message || err;
//       return res.status(404).json({ error: message });
//     }
//   };