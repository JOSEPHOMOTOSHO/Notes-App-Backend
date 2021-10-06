import express, { Request, Response, NextFunction } from 'express';
import Folder from '../model/folderModel';
import Note from '../model/noteModel';
import noteUsers from '../model/signupModel';
// import collaboratorsNoteInterface from '../interfaces/interface';
// import Collaborator from '../model/collaboratorModel';

declare module 'express' {
  interface Request {
    user?: any;
    isAuthenticated?: any;
  }
}

interface collaboratorsNoteInterface {
  noteId: string;
  title: string;
  body: string;
  folderId: string;
}
interface collaboratorsDetailsInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // folderId: string;
}

//Function to create notes
async function createNote(req: Request, res: Response, next: NextFunction) {
  const folderId = req.params.folderId;
  const { title, body, tags } = req.body;
  let user: { id?: string } = req.user;
  let createdBy;
  if (user) createdBy = user.id;
  else createdBy = req.body.createdBy;

  try {
    const folderExist = await Folder.findById(folderId);
    if (folderExist) {
      const note = {
        title,
        body,
        tags,
        folderId,
        createdBy,
      };
      await Note.create(note);
      res.send('sucessfully added');
    }
  } catch (err: any) {
    console.log(err, 'err');
    res.status(404).json({
      error: err.message,
    });
  }
}

async function getCollaborators(
  req: Request,
  res: Response
): Promise<string[] | any> {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);

    console.log(note);

    if (!note) return res.status(404).json({ error: 'Note does not exist' });

    const collaborators = note.collaboratorId;

    let collaboratorDetails: any;
    let collaboratorsObj: collaboratorsDetailsInterface = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    };
    // const collaboratorsDetails: any = [];
    // console.log(await noteUsers.findById(note.collaboratorId).select('-password -createdAt -updatedAt -__v'))
    const collab = await noteUsers
      .findById(note.collaboratorId)
      .select('-password -createdAt -updatedAt -__v');

    // for (let i = 0; i < collaborators.length; i++) {
    //   collaboratorsDetails.push(await noteUsers.findById(note.collaboratorId[i]).select('-password -createdAt -updatedAt -__v'))
    // collaboratorDetails = await noteUsers.findById(note.collaboratorId[i]);
    // collaboratorsObj.id = collaboratorDetails._id;
    // collaboratorsObj.firstName = collaboratorDetails.firstName;
    // collaboratorsObj.lastName = collaboratorDetails.lastName;
    // collaboratorsObj.email = collaboratorDetails.email;
    // collaboratorsDetails.push(collaboratorsObj);
    // collaboratorsObj = {} as collaboratorsDetailsInterface;
    // }

    if (!collab)
      return res
        .status(404)
        .json({ error: 'collaborator details not available' });

    return res.status(200).json({
      collab,
    });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function getCollaboratorsNotes(req: Request, res: Response) {
  const { collaboratorId } = req.params;

  try {
    const notes: any = await Note.find({ collaboratorId }).select(
      '-collaboratorId -createdBy -softDelete -createdAt -updatedAt -__v'
    );

    console.log(notes);

    if (!notes) {
      return res.status(404).json({ error: 'Collaborator has no notes' });
    }

    return res.status(200).json({ notes });
  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

export { createNote, getCollaborators, getCollaboratorsNotes };
