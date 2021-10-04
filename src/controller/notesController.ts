import express, { Request, Response, NextFunction } from 'express';
import Folder from '../model/folderModel';
import Note from '../model/noteModel';

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

async function getCollaborators(req: Request, res: Response) {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);

    if (!note) return res.status(404).json({ error: 'Note does not exist' });
    return res.status(200).json({
      collaborators: note.collaboratorId,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export { createNote, getCollaborators };
