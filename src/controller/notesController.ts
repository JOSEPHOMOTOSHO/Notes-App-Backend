import express, { Request, Response, NextFunction } from "express";
import Folder from "../model/folderModel";
import Note from "../model/noteModel";

//Function to create notes
async function createNote(req: Request, res: Response, next: NextFunction) {
  const { folderId } = req.params;
  const { title, body, tags } = req.body;
  try {
    const folderExist = await Folder.findById(folderId);
    if (folderExist) {
      const note = new Note({
        title,
        body,
        tags,
        folderId,
      });
      await note.save();
    }
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export default createNote;
